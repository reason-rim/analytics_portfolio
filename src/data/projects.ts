export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  html?: string;
  anchor?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  teaser: string[];
  thumbnail: string;
  heroImage: string;
  heroCaption?: string;
  heroNote?: string;
  metrics: ProjectMetric[];
  tools: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "mall-customer-analytics",
    title: "Mall Customer Analytics Project",
    tagline: "Growing high-value mall shoppers while safeguarding credit risk",
    summary:
      "Analyzed an enhanced mall-customer dataset to boost profits: cleaned and segmented in R, ran diagnostics (histograms, boxplots) and hypothesis tests (Chi-square, ANOVA, Pearson), and summarized insights in a Power BI dashboard.",
    teaser: [
      "Goal: Increase the high-spender segment while maintaining or reducing the low-credit segment.",
      "Findings: Ages 18–35 show the highest spending and variability; higher income correlates with higher credit.",
      "Actions: Prioritize 18–35 with targeted promotions, strengthen 36–50 loyalty, monitor the low-credit segment, deprioritize gender targeting.",
    ],
    thumbnail: "/projects/mall-customer-dashboard.png",
    heroImage: "/projects/mall-customer-dashboard.png",
    heroNote:
      'Dashboard created by me in Power BI; dataset sourced from Kaggle and available directly on <a href="https://www.kaggle.com/datasets/vikasjigupta786/customer-analytics-practice-dataset" target="_blank" rel="noopener noreferrer"><strong>this Kaggle dataset</strong></a>.',
    metrics: [],
    tools: ["R", "Power BI"],
    links: [
      {
        label: "Kaggle source dataset",
        href: "https://www.kaggle.com/datasets/vikasjigupta786/customer-analytics-practice-dataset",
        external: true,
      },
    ],
    sections: [
      {
        heading: "1. Introduction/Objective",
        html: `
<p>Imagine working at a shopping mall where the challenge is to grow profitable customers while avoiding financial risk!
To track this we define two KPIs:</p>
<ul>
  <li><strong>High Spender Rate (HSR)</strong>: % of customers with top 20% spending scores &rarr; growth signal.</li>
  <li><strong>Low Credit Rate (LCR)</strong>: % of customers with bottom 15% credit scores &rarr; risk guardrail.</li>
</ul>
<p>Let's focus on raising HSR without increasing LCR to ensure sustainable and profitable growth without weakening the overall credit health of our customers.</p>
`,
      },
      {
        heading: "2. Dataset Description",
        html: `
<p>An enhanced version of the well-known Mall Customers dataset from Kaggle (accessible via <a href="https://www.kaggle.com/datasets/vikasjigupta786/customer-analytics-practice-dataset" target="_blank" rel="noopener noreferrer">this Kaggle repository</a>), adjusted for consistency and depth.</p>
<h4>Columns used</h4>
<ul>
  <li><code>customer_id</code> &mdash; unique identifier for each customer</li>
  <li><code>gender</code> &mdash; male / female</li>
  <li><code>age</code> &mdash; customer age in years</li>
  <li><code>annual_income_k</code> &mdash; annual income in <em>thousand dollars</em></li>
  <li><code>spending_score_1_100</code> &mdash; mall-assigned spending behavior score (1&ndash;100), not raw revenue</li>
  <li><code>age_group</code> &mdash; binned age category (e.g., 18&ndash;25, 26&ndash;35, &hellip;)</li>
  <li><code>estimated_savings_k</code> &mdash; approximate savings in <em>thousand dollars</em> (derived from income and spending)</li>
  <li><code>credit_score</code> &mdash; synthetic score reflecting financial reliability</li>
  <li><code>loyalty_years</code> &mdash; length of customer relationship (years)</li>
  <li><code>preferred_category</code> &mdash; simulated shopping preference: Luxury, Budget, Fashion, Electronics</li>
</ul>
<h4>Notes &amp; assumptions</h4>
<ul>
  <li><code>credit_score</code> and <code>estimated_savings_k</code> are synthetic and should be treated as <em>relative indicators</em>, not absolute real-world values.</li>
  <li>Since the dataset does not include timestamps, the analysis focuses on customer segmentation rather than time-series forecasting.</li>
</ul>
`,
      },
      {
        heading: "3. Data Preparation (Cleaning)",
        html: `
<ul>
  <li>Some customers with aged 18 were missing <code>age_group</code>. Reassigned them into the <code>18&ndash;25</code> group so that every customer is accurately categorized.</li>
  <li>In the 65+ age group, one customer with ID 11 displayed a very low spending score, 14. Preserved the record as other attributes appeared consistent and plausible, considered as a genuine behaviour rather than a data error.</li>
</ul>
`,
      },
      {
        heading: "4. KPI Summary",
        html: `
        <p>To measure customer growth and financial risk, I defined the following Key Performance Indicators (KPIs).</p>
<ul>
  <li><strong>Customers (n)</strong>: total number of customers. (200)</li>
  <li><strong>Avg Income (k$)</strong>: mean of <code>annual_income_k</code>.</li>
  <li><strong>Avg Spending (1&ndash;100)</strong>: mean of <code>spending_score_1_100</code>.</li>
  <li><strong>Avg Loyalty (yrs)</strong>: mean of <code>loyalty_years</code>.</li>
  <li><strong>High Spender Rate (HSR)</strong>: percentage of customers in the top 20% of spending.</li>
  <li><strong>Low Spender Rate (LSR)</strong>: percentage of customers in bottom 15% of spending.</li>
  <li><strong>High Credit Rate (HCR)</strong>: percentage of customers in top 20% of credit.</li>
  <li><strong>Low Credit Rate (LCR)</strong>: percentage of customers in bottom 15% of credit.</li>
</ul>

<details>
  <summary class="toggle">Show quantile thresholds</summary>
  <pre><code class="language-r">HIGH_Q &lt;- 0.80   # top 20% → "High"
LOW_Q  &lt;- 0.15   # bottom 15% → "Low"

SPEND_HIGH  &lt;- quantile(customers_data$spending_score_1_100, HIGH_Q, na.rm = TRUE)
SPEND_LOW   &lt;- quantile(customers_data$spending_score_1_100, LOW_Q,  na.rm = TRUE)
CREDIT_HIGH &lt;- quantile(customers_data$credit_score,          HIGH_Q, na.rm = TRUE)
CREDIT_LOW  &lt;- quantile(customers_data$credit_score,          LOW_Q,  na.rm = TRUE)</code></pre>
</details>
`,
      },
      {
        heading: "5. Exploratory Data Analysis (EDA)",
        html: `
<h4 id="section-5-1">5.1 Spending Score Distribution</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-spending-score-histogram.png"
    alt="Histogram of Spending Score by Segment"
    style="width: 50%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<p>The histogram illustrates the distribution of customer Spending Scores (1&ndash;100), revealing three distinct groups: <strong>Low-Spender</strong> (blue, bottom 15%, &le;16.8), <strong>High-Spender</strong> (yellow, top 20%, &ge;75), and <strong>Mid-Range</strong> (grey).</p>
<p><strong>So what?</strong> About 21.5% of customers fall into the high-spender group, making them a clear growth opportunity. Meanwhile, the low-spender group (15%) is relatively small, so targeting them would have limited impact. Prioritizing campaigns for the high spenders improves Return on Investment (ROI) because these customers already demonstrate strong spending behaviour and clear growth potential.</p>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">ggplot(customers_data, aes(x = spending_score_1_100, fill = spender_group)) +
  geom_histogram(binwidth = 5, boundary = 0, color = "black") +
  scale_fill_manual(values = band_colors) +
  labs(title = "Histogram of Spending Score by Segment",
       x = "Spending Score (1-100)", y = "Count",
       fill = "Spender Group")</code></pre>
</details>
<h4 id="section-5-2">5.2 Credit Score Distribution</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-eda-5-2.png"
    alt="Histogram of Credit Score Distribution by Segment"
    style="width: 50%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<p>The histogram of Credit Scores is right-skewed, with most customers concentrated near the higher end. The mean score is <strong>743.7</strong>, while the median is higher at <strong>833</strong>, revealing a concentration of customers with stronger creditworthiness. The <strong>High-Credit</strong> group (gold bars, &ge;850, top 20%) forms a substantial cluster of customers with strong creditworthiness. In contrast, the <strong>Low-Credit</strong> group (blue bars, &le;597.4, bottom 15%) is relatively small, representing a risk-sensitive segment, while gray bars capture the mid-range customers.</p>
<p><strong>So what?</strong> Most customers cluster at the higher end of credit scores, reflecting a strong base of financially trustworthy customers and low overall risk exposure. However, given the presence of a small low-credit tail, ongoing monitoring is important for sustainable business performance.</p>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">ggplot(customers_data, aes(x = credit_score, fill = credit_group)) +
  geom_histogram(binwidth = 25, boundary = 0, color = "black") +
  scale_fill_manual(values = credit_colors) +
  labs(title = "Credit Score Distribution by Segment",
       x = "Credit Score", y = "Count",
       fill = "Credit Group")</code></pre>
</details>
<h4 id="section-5-3">5.3 Age Group vs Spending Score</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-eda-5-3.png"
    alt="Boxplot of Spending Scores by Age Group"
    style="width: 50%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<p>The boxplot highlights clear spending differences across age groups. Younger customers aged <strong>18&ndash;35</strong> show the highest average spending and wide variation, identifying them as a key growth group. In contrast, middle-aged cohorts (36&ndash;65) sit notably lower than other groups.</p>
<p><strong>So what?</strong> The mall can either strengthen profitability by offering targeted incentives to younger customers (18&ndash;35) or design targeted strategies for middle-aged groups (36&ndash;65) to increase their engagement closer to the current younger group.</p>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">ggplot(customers_data, aes(age_group, spending_score_1_100, fill = age_group)) +
  geom_boxplot(outlier.fill = "white", outlier.color = "red", outlier.size = 2) +
  scale_fill_brewer(palette = "Set3") +
  labs(title = "Spending by Age Group", x = "Age Group", y = "Spending Score")</code></pre>
</details>
<h4 id="section-5-4">5.4 Category Preference by Gender</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-eda-5-4.png"
    alt="Column chart of category preference split by gender"
    style="width: 50%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<p>Females consistently show higher shares across all categories (Budget, Electronics, Fashion, Luxury). The gender gap is most pronounced in Budget and Luxury, where women represent close to 60% versus about 40% for men. In Electronics and Fashion, the gap is narrower but still leans female.</p>
<p><strong>So what?</strong> These patterns suggest clear opportunities. Marketing campaigns should emphasize female-oriented targeting in Budget and Luxury, where women dominate, while Electronics and Fashion present more balanced opportunities to engage men effectively. Furthermore, cross-selling can unlock additional value: female Luxury shoppers may be encouraged to explore Electronics or Fashion, while male customers in Electronics and Fashion can be guided toward Luxury products.</p>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">customers_data |>
  count(preferred_category, gender) |>
  group_by(preferred_category) |>
  mutate(share = n / sum(n)) |>
  ggplot(aes(preferred_category, share, fill = gender)) +
  geom_col(position = position_dodge(width = 0.75), width = 0.7, color = "black") +
  scale_y_continuous(labels = scales::percent_format(accuracy = 1)) +
  scale_fill_manual(values = c("Female" = "lightpink", "Male" = "lightblue")) +
  labs(title = "Category Preference by Gender", x = NULL, y = "Share (%)") +
  theme_minimal(base_size = 12) +
  theme(legend.position = "top")</code></pre>
</details>
<h4 id="section-5-5">5.5 Annual Income vs Credit Score</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-eda-5-5.png"
    alt="Scatter plot of annual income versus credit score with trend line"
    style="width: 50%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<p>There is a clear positive relationship between annual income and credit score. Customers with higher incomes usually have higher credit scores, showing stronger creditworthiness. The regression line (blue) also confirms this upward trend as the black data points align closely with the regression line. At lower income levels (&le;40k), credit scores spread out more widely, with some very low and some mid-range scores. At higher income levels (&ge;60k), most customers cluster near the top range, with fewer low-credit cases.</p>
<p><strong>So what?</strong> Income can be a useful signal for credit risk segmentation. High-income customers are safer and more creditworthy, making them strong targets for marketing or lending. But because low-income customers show more variation, extra checks are needed before targeting them based on income alone.</p>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">ggplot(customers_data, aes(annual_income_k, credit_score)) +
  geom_point(alpha = .4) +
  geom_smooth(method = "lm", se = FALSE, col = "blue") +
  labs(title = "Income vs Credit Score", x = "Annual Income (k$)", y = "Credit Score")</code></pre>
</details>
`,
      },
      {
        heading: "6. Statistical Deep Dives",
        html: `
<h4 id="section-6-1">6.1 Gender vs Preferred Category (Chi-square)</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-chi-square-results.png"
    alt="Chi-square contingency table and results for gender versus preferred category"
    style="width: 70%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<ul>
  <li><strong>Question:</strong> Does category <code>preferred_category</code> differ by <code>gender</code>?</li>
  <li><strong>Null hypothesis H<sub>0</sub>:</strong> Gender and category are independent.</li>
  <li><strong>Alternative hypothesis H<sub>1</sub>:</strong> There is an association between gender and category.</li>
  <li><strong>Results &amp; Conclusion:</strong> By using Chi-square test, the p-value (0.8993) is much greater than 0.05, so there is no evidence against the null hypothesis that category preference differs by gender. Therefore, to grow profitable customers while avoiding financial risk, it is advisable to deprioritize gender-targeted campaigns or events for specific categories and focus on more influential factors, such as spending behaviour and income.</li>
</ul>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">tab_gc <- table(Gender = customers_data$gender,
                Category = customers_data$preferred_category)
chisq.test(tab_gc)</code></pre>
</details>
<h4 id="section-6-2">6.2 Spending Score by Age Group (One-way ANOVA)</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-anova-results.png"
    alt="ANOVA summary output for spending score by age group"
    style="width: 70%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<ul>
  <li><strong>Question:</strong> Do average <code>spending_score_1_100</code> levels differ across <code>age_group</code>?</li>
  <li><strong>Why ANOVA?</strong> We’re comparing the mean of one numeric outcome across more than two independent groups (age bands). A one-way ANOVA tests whether at least one group mean differs.</li>
  <li><strong>Null Hypothesis:</strong> H<sub>0</sub>: All age group means are equal.</li>
  <li><strong>Alternative Hypothesis:</strong> H<sub>1</sub>: At least one age group mean differs.</li>
  <li><strong>Results &amp; Conclusion:</strong> The ANOVA (F-test) shows a significant effect of age group on spending score. As F(4, 195) = 11.666 and p = 1.63&times;10<sup>&minus;8</sup>, we can conclude there is strong evidence against our null hypothesis that at least one group mean differs. Additionally, a large Adjusted R&sup2; &asymp; 0.193 suggests a meaningful effect, which means the model is fine for inference. Therefore, overall, we conclude that there are significant differences in average spending scores among age groups. To increase spending, age-targeted marketing strategies might be useful. For example, for 18–35 offer limited-time drops, bundle discounts, and social/app promos; for 36–50 emphasize loyalty perks; and for 65+ highlight convenience such as easy returns and assisted in-store service.</li>
</ul>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">fit_anova <- lm(spending_score_1_100 ~ age_group, data = customers_data)
summary(fit_anova)</code></pre>
</details>
<h4 id="section-6-3">6.3 Annual Income vs Credit Score — Pearson Correlation (p-value only)</h4>
<figure style="text-align: center;">
  <img
    src="/projects/mall-pearson-correlation.png"
    alt="Pearson correlation output for income versus credit score"
    style="width: 20%; height: auto; display: block; margin: 0 auto;"
  />
</figure>
<ul>
  <li><strong>Question:</strong> Are <code>annual_income_k</code> and <code>credit_score</code> linearly related?</li>
  <li><strong>Null Hypothesis:</strong> H<sub>0</sub>: &rho; = 0.</li>
  <li><strong>Alternative Hypothesis:</strong> H<sub>1</sub>: &rho; ≠ 0.</li>
  <li><strong>Results &amp; Conclusion:</strong> The Pearson correlation between annual income (k$) and credit score is 0.7492, and a p-value is very close to 0 but less than 0.0001, suggesting a strong positive linear associatio between annual income and credit score. Practically, higher-income customers tend to have higher credit scores. The scatter plot with the fitted blue line above in <a href="#section-5-5">Section&nbsp;5.5</a> visually supports this, showing an upward trend with tighter clustering at higher incomes and wider dispersion at lower incomes.</li>
</ul>
<details>
  <summary class="toggle">Show R code</summary>
  <pre><code class="language-r">library(kableExtra)

dat <- customers_data |>
  dplyr::select(annual_income_k, credit_score)

ct <- cor.test(dat$annual_income_k, dat$credit_score, method = "pearson")

# helper to print tiny p-values as inequalities instead of 0
fmt_p <- function(p){
  if (p < 1e-4) "< 0.0001"
  else if (p < 1e-3) "< 0.001"
  else if (p < 1e-2) "< 0.01"
  else sprintf("%.4f", p)
}

tibble::tibble(
  n       = length(dat$annual_income_k),
  r       = round(unname(ct$estimate), 4),     # correlation coefficient
  p_value = fmt_p(unname(ct$p.value))          # formatted p-value
) |>
  knitr::kable(
    digits  = 4,
    caption = "Pearson correlation",
    align   = c("c","c","c")
  ) |>
  kable_styling(
    full_width = FALSE,
    position   = "center"
  )
</code></pre>
</details>
`,
      },
      {
        heading: "7. Conclusion",
        html: `
<p class="text-slate-600">The data tells a clear story: younger customers spend more—and with greater variability—while credit quality is concentrated at the high end. Higher income is associated with higher credit scores. Based on these findings, the strategy is to expand high-spending customers (especially ages 18–35) while maintaining or reducing low-credit customers through targeted promotions for 18–35, loyalty reinforcement for ages 36–50, and continuous low-credit monitoring. Finally, given the non-significant chi-square for gender vs. preferred category, gender-based targeting is deprioritized. Focusing on spending and income signals is a more effective path to grow spend.</p>
`,
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
