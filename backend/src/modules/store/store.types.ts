export interface CreateStoreDTO {
  user_id: string;
  name: string;
  category: string;
  details?: string;
  operational_range?: string;
  has_custom?: boolean;
  logo?: string;
  logo_public_id?: string;
}