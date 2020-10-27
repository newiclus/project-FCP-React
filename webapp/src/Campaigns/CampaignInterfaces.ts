export interface ICampaign {
  id?: string
  from: string
  to: string
  blockOne: IBlock
  blockTwo: IBlock
  blockThree: IBlock
  blockFour: IBlock
}

interface IBlock {
  title: string
  content: string
}