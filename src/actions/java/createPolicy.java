//
// Creating a Policy
//
public static Policy policy() throws CloudproofException {
  return new Policy(20, // maximum number of creation of partition values
    new PolicyAxis[] {
      new PolicyAxis("department",
        new PolicyAxisAttribute[] {
          new PolicyAxisAttribute("Marketing", false),
          new PolicyAxisAttribute("HR", false),
        false
      ),
      new PolicyAxis("country",
        new PolicyAxisAttribute[] {
          new PolicyAxisAttribute("France", false),
          new PolicyAxisAttribute("Spain", false),
          new PolicyAxisAttribute("Germany", false)},
        false
      )
    }
  );
}
