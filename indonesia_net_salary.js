function getNetSalary(gross_salary) {
  /*
  This function simply calculates
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

