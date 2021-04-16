function getNetSalary(gross_salary) {
  /*
  This function simply calculates the net salary from given gross salary (monthly)
  Indonesia tax structure:
  Taxed income = Annual income - 54M IDR
  
  Taxed income tax policy:
  First IDR 50M		:  5%
  IDR 50M - IDR 250M	: 15%
  IDR 250M - IDR 500M	: 25%
  IDR 500M above	: 30%

  Example:
  With monthly salary of IDR 40M:
  Annual income		: IDR 480M
  Taxable income	: IDR 426M
  
  With IDR 426M in calculation
  First IDR 50M		:  5% of IDR 50M
  IDR 50M - IDR 250M	: 15% of IDR 200M
  IDR 250M - IDR 500M	: 25% of IDR 176M
  IDR 500M above	: Not applicable
  
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

