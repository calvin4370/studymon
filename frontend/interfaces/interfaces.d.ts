interface OwnedCardProps {
  cardNum: string;
  id: string;
  lastObtained: string;
  numOwned: number;
  setCode: string;
}

interface AllCardProps {
  cardArt: string;
  category: string;
  faculty?: string;
  id: string;
  name: string
  rarity: string;
  set: string;
  year?: string;
}

interface DisplayCardProps {
  cardArt?: string;
  category?: string;
  faculty?: string;
  id: string; // only compulsory
  name?: string
  rarity?: string;
  set?: string;
  year?: string;
  
  cardNum?: string;
  lastObtained?: string;
  numOwned?: number;
  setCode?: string;
}