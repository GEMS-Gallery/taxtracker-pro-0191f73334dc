export const idlFactory = ({ IDL }) => {
  const TaxPayerRecord = IDL.Record({
    'tid' : IDL.Text,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  return IDL.Service({
    'addTaxPayer' : IDL.Func([TaxPayerRecord], [], []),
    'getTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayerRecord)], ['query']),
    'searchTaxPayer' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(TaxPayerRecord)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
