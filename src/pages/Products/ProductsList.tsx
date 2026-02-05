import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import  Button  from '../../components/ui/Button/Button';
import type { ProductResponse } from '../../types/api.types';

export default function ProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({ page, size: 10 });
      setProducts(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      render: (product: ProductResponse) => (
        <div className="font-medium text-foreground">{product.name}</div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (product: ProductResponse) => (
        <div className="text-foreground/70 max-w-xs truncate">
          {product.description || '-'}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Catégorie',
    },
    {
      key: 'price',
      header: 'Prix',
      render: (product: ProductResponse) => (
        <div className="font-medium">{product.price.toFixed(2)} DH</div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Catalogue de Produits"
        description="Liste de tous les produits"
        action={
          <Button onClick={() => navigate('/dashboard/products/create')}>
            Ajouter un produit
          </Button>
        }
      />

      <DataTable
        data={products}
        columns={columns}
        onRowClick={(product) => navigate(`/dashboard/products/${product.id}`)}
        isLoading={loading}
        emptyMessage="Aucun produit trouvé"
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Précédent
          </Button>
          <span className="flex items-center px-4 text-sm text-foreground/70">
            Page {page + 1} sur {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}
