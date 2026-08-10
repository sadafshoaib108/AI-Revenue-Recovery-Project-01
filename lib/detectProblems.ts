import { storeData } from "./storeData";

export type Severity = "HIGH" | "MEDIUM" | "LOW";

export interface Problem {
  id: string;
  title: string;
  description: string;
  severity: Severity;
}

export function detectProblems(): Problem[] {
  const { thisWeek, lastWeek } = storeData;
  const problems: Problem[] = [];

  // 1. Checkout abandonment
  if (thisWeek.checkoutAbandonment > lastWeek.checkoutAbandonment) {
    const diff = thisWeek.checkoutAbandonment - lastWeek.checkoutAbandonment;
    problems.push({
      id: "checkout-abandonment",
      title: "Checkout abandonment increased",
      description: `Checkout abandonment rose from ${lastWeek.checkoutAbandonment}% to ${thisWeek.checkoutAbandonment}% this week.`,
      severity: diff >= 10 ? "HIGH" : diff >= 5 ? "MEDIUM" : "LOW",
    });
  }

  // 2. Product conversion drops
for (const product of Object.keys(thisWeek.productConversion) as Array<keyof typeof thisWeek.productConversion>) {
    const current = thisWeek.productConversion[product];
    const previous = lastWeek.productConversion[product];
    if (current < previous) {
      const dropPct = ((previous - current) / previous) * 100;
      problems.push({
        id: `product-conversion-${product}`,
        title: `Product '${product}' conversion dropped`,
        description: `Conversion for this product fell ${dropPct.toFixed(0)}% compared to last week.`,
        severity: dropPct >= 20 ? "HIGH" : dropPct >= 10 ? "MEDIUM" : "LOW",
      });
    }
  }

  // 3. Refund rate
  if (thisWeek.refundRate > lastWeek.refundRate) {
    const diff = thisWeek.refundRate - lastWeek.refundRate;
    problems.push({
      id: "refund-rate",
      title: "Refund rate elevated",
      description: `Refunds increased by ${diff}% compared to last week.`,
      severity: diff >= 8 ? "HIGH" : diff >= 4 ? "MEDIUM" : "LOW",
    });
  }

  // 4. Overall conversion rate
  if (thisWeek.conversionRate < lastWeek.conversionRate) {
    const diff = lastWeek.conversionRate - thisWeek.conversionRate;
    problems.push({
      id: "conversion-rate",
      title: "Overall conversion rate dropped",
      description: `Conversion rate fell from ${lastWeek.conversionRate}% to ${thisWeek.conversionRate}%.`,
      severity: diff >= 1 ? "HIGH" : diff >= 0.5 ? "MEDIUM" : "LOW",
    });
  }

  // Sort so HIGH severity shows first
  const order: Record<Severity, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  problems.sort((a, b) => order[a.severity] - order[b.severity]);

  return problems;
}