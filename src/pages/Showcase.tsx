import React, { useState, useEffect, useMemo } from 'react';
import { Briefcase, ShoppingBag, Plus, Search, Filter, Eye, ExternalLink, Mail } from 'lucide-react';
import { Hero } from '../components/Common/Hero';
import { SearchBar } from '../components/Common/SearchBar';
import { Modal } from '../components/Common/Modal';
import { BusinessForm } from '../components/Showcase/businessForm';
import { supabase } from '../lib/supabaseClient'; // Import supabase
import { Business } from '../data/mockData'; // Keep mockProducts for now
import { Product } from '../types/Product'; // Define a new Product type based on Supabase schema

export function Showcase() {
  const [activeTab, setActiveTab] = useState<"businesses" | "products">(
    "businesses"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  // State for fetched businesses
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch businesses from Supabase
  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('name'); // Order by name for consistent display

      if (error) {
        console.error('Error fetching businesses:', error);
        setError('Failed to load businesses from database');
        setBusinesses([]);
      } else {
        // Basic validation and normalization for fetched data
        const validBusinesses: Business[] = (data || []).map(b => ({
          id: b.id,
          name: b.name || 'Untitled Business',
          owner: b.owner || 'Unknown',
          description: b.description || '',
          category: b.category || 'General',
          logo: b.logo || '/images/placeholder-business.svg',
          contact: b.contact || '',
        }));
        setBusinesses(validBusinesses);
      }
    } catch (err) {
      console.error('Unexpected error fetching businesses:', err);
      setError('An unexpected error occurred');
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // State for fetched products
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);

      const { data, error } = await supabase
        .from('products')
        .select('*, businesses(name)')
        .order('name');

      if (error) {
        console.error('Error fetching products:', error);
        setErrorProducts('Failed to load products from database');
        setProducts([]);
      } else {
        const validProducts: Product[] = (data || []).map((p: any) => ({
          id: p.id,
          created_at: p.created_at,
          name: p.name || 'Untitled Product',
          description: p.description || '',
          image_url: p.image_url || '/images/placeholder-product.svg',
          price: p.price || null,
          category: p.category || 'General',
          businesses: p.businesses || null, // Directly assign the nested businesses object
        }));
        setProducts(validProducts);
      }
    } catch (err) {
      console.error('Unexpected error fetching products:', err);
      setErrorProducts('An unexpected error occurred');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab]);

  // Get unique categories (now based on fetched businesses)
  const businessCategories = useMemo(() => {
    const categorySet = new Set<string>();
    businesses.forEach(business => {
      if (business.category) {
        categorySet.add(business.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [businesses]);

  const productCategories = useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [products]);

  // Filter businesses (now based on fetched businesses)
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || business.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Handle successful business form submission
  const handleBusinessFormSuccess = () => {
    setShowBusinessForm(false);
    fetchBusinesses(); // Refresh the businesses list
  };

  // Handle business form cancellation
  const handleBusinessFormCancel = () => {
    setShowBusinessForm(false);
  };

  // Determine contact link based on contact type
  const getContactLink = (contact: string) => {
    if (contact.includes('@')) {
      return `mailto:${contact}`;
    } else if (contact.startsWith('http')) {
      return contact;
    } else if (contact.match(/^\+?\d/)) {
      return `tel:${contact}`;
    }
    return `mailto:${contact}`;
  };

  return (
    <div>
      <Hero
        title="Showcase & Marketplace"
        subtitle="Discover amazing businesses and products created by women entrepreneurs in our community."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab("businesses")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === "businesses"
                ? "btn-primary"
                : "border-2 hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "businesses"
                ? {}
                : {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "transparent",
                  }
            }
          >
            <Briefcase className="h-5 w-5 inline mr-2" />
            Business Directory
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === "products"
                ? "btn-primary"
                : "border-2 hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "products"
                ? {}
                : {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "transparent",
                  }
            }
          >
            <ShoppingBag className="h-5 w-5 inline mr-2" />
            Product Gallery
          </button>
        </div>
      </Hero>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={
                activeTab === "businesses"
                  ? "Search businesses by name, owner, or description..."
                  : "Search products by name, description, or seller..."
              }
            />

            <div className="flex flex-wrap gap-4">
              <div
                className="flex items-center rounded-lg px-3 cursor-pointer border w-auto"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                {/* Icon on the left */}
                <Filter
                  className="h-5 w-5 mr-2 shrink-0"
                  style={{ color: "var(--text-secondary)" }}
                />

                {/* Dropdown on the right */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent focus:outline-none appearance-none w-auto py-2"
                >
                  <option value="">All Categories</option>
                  {(activeTab === "businesses"
                    ? businessCategories
                    : productCategories
                  ).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Businesses Tab */}
          {activeTab === "businesses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {loading ? 'Loading...' : `${filteredBusinesses.length} ${filteredBusinesses.length === 1 ? 'business' : 'businesses'} found`}
                  </p>
                  {error && (
                    <p className="text-red-500 text-sm">
                      {error}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => setShowBusinessForm(true)}
                  className="btn-primary inline-flex items-center space-x-2 px-4 py-2 font-medium rounded-lg hover:transform hover:-translate-y-1 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Your Business</span>
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" 
                       style={{ borderColor: 'var(--primary)' }}></div>
                  <p style={{ color: 'var(--text-secondary)' }}>Loading businesses...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBusinesses.map((business) => (
                      <div key={business.id} className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-200">
                        <div className="text-center mb-4">
                          <img
                            src={business.logo}
                            alt={business.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2"
                            style={{ borderColor: 'var(--border-color)' }}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder-business.svg';
                            }}
                          />
                          <h3 className="text-xl font-semibold mb-1 break-words" style={{ color: 'var(--text-primary)' }}>
                            {business.name}
                          </h3>
                          <p className="text-sm mb-2 break-words" style={{ color: 'var(--text-secondary)' }}>
                            by {business.owner}
                          </p>
                          {business.category && (
                            <span
                              className="px-3 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: 'var(--tertiary)',
                                color: 'var(--text-primary)'
                              }}
                            >
                              {business.category}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm mb-4 text-center line-clamp-3 break-words" style={{ color: 'var(--text-secondary)' }}>
                          {business.description || 'No description available.'}
                        </p>
                        
                        <div className="space-y-2">
                          <button
                            onClick={() => setSelectedBusiness(business)}
                            className="btn-primary w-full py-2 font-medium rounded-lg hover:transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Learn More
                          </button>
                          {business.contact && (
                            <a
                              href={getContactLink(business.contact)}
                              target={business.contact.startsWith('http') ? '_blank' : undefined}
                              rel={business.contact.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="w-full py-2 font-medium rounded-lg border-2 text-center block transition-all duration-200 hover:bg-opacity-10 hover:transform hover:-translate-y-0.5"
                              style={{ 
                                borderColor: 'var(--primary)',
                                color: 'var(--primary)'
                              }}
                            >
                              Contact
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredBusinesses.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        No businesses found
                      </h3>
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {searchTerm || selectedCategory ? 'Try adjusting your search criteria.' : 'Be the first to list your business!'}
                      </p>
                      {!searchTerm && !selectedCategory && (
                        <button 
                          onClick={() => setShowBusinessForm(true)}
                          className="btn-primary inline-flex items-center space-x-2 px-6 py-3 font-medium rounded-lg"
                        >
                          <Plus className="h-4 w-4" />
                          <span>List Your Business</span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
                <button className="btn-primary inline-flex items-center space-x-2 px-4 py-2 font-medium rounded-lg hover:transform hover:-translate-y-1 transition-all duration-200">
                  <Plus className="h-4 w-4" />
                  <span>Add Your Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card overflow-hidden group cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-200"
                       onClick={() => setSelectedProduct(product)}>
                    <div className="relative">
                      <img
                        src={product.image_url || '/images/placeholder-product.svg'}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.svg';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 break-words" style={{ color: 'var(--text-primary)' }}>
                        {product.name}
                      </h3>
                      <p className="text-sm mb-2 line-clamp-2 break-words" style={{ color: 'var(--text-secondary)' }}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold"
                          style={{ color: "var(--primary)" }}
                        >
                          {product.price !== null ? `${product.price.toFixed(2)}` : 'N/A'}
                        </span>
                        <span className="text-xs break-words" style={{ color: 'var(--text-secondary)' }}>
                          by {product.businesses ? product.businesses.name : 'Unknown Seller'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No products found
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Business Form Modal */}
      {showBusinessForm && (
        <Modal
          isOpen={true}
          onClose={handleBusinessFormCancel}
          title="List Your Business"
          size="xl"
        >
          <BusinessForm
            onCancel={handleBusinessFormCancel}
            onSuccess={handleBusinessFormSuccess}
          />
        </Modal>
      )}

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBusiness(null)}
          title={selectedBusiness.name}
          size="lg"
        >
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={selectedBusiness.logo}
                alt={selectedBusiness.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2"
                style={{ borderColor: 'var(--border-color)' }}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-business.svg';
                }}
              />
              <h2 className="text-2xl font-bold mb-2 break-words" style={{ color: 'var(--text-primary)' }}>
                {selectedBusiness.name}
              </h2>
              <p className="text-lg mb-2 break-words" style={{ color: 'var(--text-secondary)' }}>
                Founded by {selectedBusiness.owner}
              </p>
              {selectedBusiness.category && (
                <span
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--tertiary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {selectedBusiness.category}
                </span>
              )}
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                About the Business
              </h3>
              <p className="text-base leading-relaxed break-words" style={{ color: 'var(--text-secondary)' }}>
                {selectedBusiness.description || 'No description available.'}
              </p>
            </div>

            <div className="flex space-x-4">
              {selectedBusiness.contact && (
                <a
                  href={getContactLink(selectedBusiness.contact)}
                  target={selectedBusiness.contact.startsWith('http') ? '_blank' : undefined}
                  rel={selectedBusiness.contact.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary flex-1 inline-flex items-center justify-center space-x-2 py-3 font-medium rounded-lg hover:transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Business</span>
                </a>
              )}
              <button className="flex-1 py-3 font-medium rounded-lg border-2 transition-all duration-200 hover:bg-opacity-10 hover:transform hover:-translate-y-0.5"
                      style={{ 
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)'
                      }}>
                View Products
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
          size="lg"
        >
          <div className="space-y-6">
            <img
              src={selectedProduct.image_url || '/images/placeholder-product.svg'}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder-product.svg';
              }}
            />

            <div className="flex items-center justify-between">
              <div>
                <span
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedProduct.category}
                </span>
                <p className="text-sm mt-2 break-words" style={{ color: 'var(--text-secondary)' }}>
                  by {selectedProduct.businesses ? selectedProduct.businesses.name : 'Unknown Seller'}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {selectedProduct.price !== null ? `${selectedProduct.price.toFixed(2)}` : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Product Description
              </h3>
              <p className="text-base leading-relaxed break-words" style={{ color: 'var(--text-secondary)' }}>
                {selectedProduct.description}
              </p>
            </div>

            <div className="flex space-x-4">
              <button className="btn-primary flex-1 py-3 font-medium rounded-lg hover:transform hover:-translate-y-0.5 transition-all duration-200">
                Contact Seller
              </button>
              <button className="flex-1 py-3 font-medium rounded-lg border-2 transition-all duration-200 hover:bg-opacity-10 hover:transform hover:-translate-y-0.5"
                      style={{ 
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)'
                      }}>
                View Store
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}