function getNetSalary(gross_salary) {
  /*
  This function calculates monthly net salary from given gross salary (monthly)
  Indonesia tax structure:
  Non-taxable income (PTKP) = IDR 54M
  Taxable income = Annual income - Non-taxable income
  
  Taxable income tax policy:
  First IDR 50M		:  5%
  IDR 50M - IDR 250M	: 15%
  IDR 250M - IDR 500M	: 25%
  IDR 500M above	: 30%

  Example 1:
  Monthly salary of IDR 10M:
  Annual income		: IDR 120M --> Taxable income	: IDR 66M
  -------------------------------------------------------------
  | Tax Level		| Applicable Tax  | Remaining Amount |
  -------------------------------------------------------------
  | First IDR 50M	|    50.000.000   |    16.000.000    |
  | IDR 50M - IDR 250M	|    16.000.000   |             0    |
  | IDR 250M - IDR 500M	|             0   |             0    |
  | IDR 500M above	|             0   |             0    |
  -------------------------------------------------------------

  Example 2:
  Monthly salary of IDR 40M:
  Annual income		: IDR 480M --> Taxable income	: IDR 426M
  -------------------------------------------------------------
  | Tax Level		| Applicable Tax  | Remaining Amount |
  -------------------------------------------------------------
  | First IDR 50M	|    50.000.000   |   376.000.000    |
  | IDR 50M - IDR 250M	|   200.000.000   |   176.000.000    |
  | IDR 250M - IDR 500M	|   176.000.000   |             0    |
  | IDR 500M above	|             0   |             0    |
  -------------------------------------------------------------

  Example 3:
  Monthly salary of IDR 50M:
  Annual income		: IDR 600M --> Taxable income	: IDR 546M
  -------------------------------------------------------------
  | Tax Level		| Applicable Tax  | Remaining Amount |
  -------------------------------------------------------------
  | First IDR 50M	|    50.000.000   |   496.000.000    |
  | IDR 50M - IDR 250M	|   200.000.000   |   296.000.000    |
  | IDR 250M - IDR 500M	|   250.000.000   |    46.000.000    |
  | IDR 500M above	|    46.000.000   |             0    |
  -------------------------------------------------------------
  
  */
  annual_salary = 12 * gross_salary;

  reduction_PTKP = 54000000; // exemption
  lvl1_limit = 50000000; // 5% of relevant amount
  lvl2_limit = 200000000; // 15% of relevant amount
  lvl3_limit = 250000000; // 25% of relevant amount, above this is 30% (uncapped)

  lvl1_tax = Math.min(Math.max(0, annual_salary - reduction_PTKP), lvl1_limit);
  lvl2_tax = Math.min(Math.max(0, annual_salary - reduction_PTKP - lvl1_limit), lvl2_limit);
  lvl3_tax = Math.min(Math.max(0, annual_salary - reduction_PTKP - lvl1_limit - lvl2_limit), lvl3_limit);
  lvl4_tax = Math.max(0, annual_salary - reduction_PTKP - lvl1_limit - lvl2_limit - lvl3_limit);

  annual_tax = 0.05 * lvl1_tax + 0.15 * lvl2_tax + 0.25 * lvl3_tax + 0.30 * lvl4_tax;

  return gross_salary - annual_tax / 12;
}

