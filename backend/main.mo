import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  // TaxPayer record type
  type TaxPayerRecord = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Stable variable to store TaxPayer records
  stable var taxPayers: [TaxPayerRecord] = [];

  // Get all TaxPayer records
  public query func getTaxPayers(): async [TaxPayerRecord] {
    taxPayers
  };

  // Add a new TaxPayer record
  public func addTaxPayer(record: TaxPayerRecord): async () {
    taxPayers := Array.append(taxPayers, [record]);
  };

  // Search for a TaxPayer by TID
  public query func searchTaxPayer(tid: Text): async ?TaxPayerRecord {
    Array.find(taxPayers, func(tp: TaxPayerRecord): Bool {
      Text.equal(tp.tid, tid)
    })
  };
}
