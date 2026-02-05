// Base Response Wrapper
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  timestamp: number;
  path: string;
  errors?: any;
}

// Pagination
export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PageableObject {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortObject;
}

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: PageableObject;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  sort: SortObject;
}

// Authentication
export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  expiresIn: number;
  role: string;
  type: string;
}

// Role & Permission
export interface PermissionDTO {
  id: number;
  name: string;
  description?: string;
}

export interface RoleDTO {
  id: number;
  name: string;
  description?: string;
  permissions: PermissionDTO[];
}

// Zone
export interface ZoneRequest {
  name: string;
  codePostal: string;
}

export interface ZoneResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  codePostal: string;
}

// Recipient
export interface RecipientRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  rue?: string;
  ville?: string;
  codePostal?: string;
}

export interface RecipientResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rue: string;
  ville: string;
  codePostal: string;
}

// Client
export interface ClientRequest {
  lastName?: string;
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  rue?: string;
  ville?: string;
  codePostal?: string;
}

export interface RegisterClientRequest {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  rue?: string;
  ville?: string;
  codePostal?: string;
}

export  interface ClientResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rue: string;
  ville: string;
  codePostal: string;
}

// Driver
export interface DriverRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  vehicleType?: string;
  licenseNumber?: string;
}

export interface DriverResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vehicleType: string;
  licenseNumber: string;
  status: string;
}

// Product
export interface ProductRequest {
  name: string;
  description?: string;
  price?: number;
  category?: string;
}

export interface ProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Colis (Parcel)
export type ColisStatus = 'CREATED' | 'COLLECTED' | 'IN_STOCK' | 'IN_TRANSIT' | 'DELIVERED';

export type Priorite = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface AdresseDTO {
  ville: string;
  rue: string;
  codePostal: string;
}

export interface ProduitColisDTO {
  productId: string;
  quantite: number;
  prix: number;
}

export interface ColisRequest {
  reference?: string;
  poids?: number;
  description?: string;
  priorite?: Priorite;
  expediteurId?: string;
  destinataireId?: string;
  zoneId?: string;
  productList?: ProduitColisDTO[];
  ville?: string;
  rue?: string;
  codePostal?: string;
}

export interface ColisProductResponse {
  id: string;
  product: ProductResponse;
  quantite: number;
  prix: number;
}

export interface ColisResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  reference: string;
  poids: number;
  description: string;
  statut: ColisStatus;
  priorite: Priorite;
  expediteur: ClientResponse;
  livreur?: DriverResponse;
  destinataire: RecipientResponse;
  products: ColisProductResponse[];
  zone: ZoneResponse;
  adresseLivraison: AdresseDTO;
}

export interface UpdateStatusRequest {
  statut: ColisStatus;
  commentaire?: string;
  utilisateurId: string;
}

export interface AssignerLivreurRequest {
  livreurId: string;
}

// History
export interface HistoriqueLivraisonResponse {
  id: string;
  createdAt: string;
  statut: ColisStatus;
  commentaire?: string;
  utilisateur: string;
  colisId: string;
}

// Synthesis
export interface SyntheseDTO<T> {
  key: T;
  count: number;
  totalPoids: number;
}
