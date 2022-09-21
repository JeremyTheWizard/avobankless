export type Deposits = Array<{
  asset: string;
  earned: number;
  deposited: number;
  available: number;
}>;

export type Loans = Array<{
  asset: string;
  avgInterest: string;
  borrowed: string;
  endsOn: string;
  flowRate: string;
}>;
