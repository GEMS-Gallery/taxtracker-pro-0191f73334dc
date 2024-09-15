import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface TaxPayerRecord {
  'tid' : string,
  'address' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'addTaxPayer' : ActorMethod<[TaxPayerRecord], undefined>,
  'getTaxPayers' : ActorMethod<[], Array<TaxPayerRecord>>,
  'searchTaxPayer' : ActorMethod<[string], [] | [TaxPayerRecord]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
