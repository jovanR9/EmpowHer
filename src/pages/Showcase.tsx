import React, { useState, useMemo } from 'react';
import { Briefcase, ShoppingBag, Plus, Search, Filter, Eye, ExternalLink, Mail } from 'lucide-react';
import { Hero } from '../components/Common/Hero';
import { SearchBar } from '../components/Common/SearchBar';
import { Modal } from '../components/Common/Modal';
import { mockBusinesses, mockProducts, Business, Product } from '../data/mockData';

export function Showcase() {
  const [activeTab, setActiveTab] = useState<'businesses' | 'products'>('businesses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Get unique categories
  const businessCategories = useMemo(() => {
    const categorySet = new Set<string>();
    mockBusinesses.forEach(business => categorySet.add(business.category));
    return Array.from(categorySet).sort();
  }, []);

  const productCategories = useMemo(() => {
    const categorySet = new Set<string>();
    mockProducts.forEach(product => categorySet.add(product.category));
    return Array.from(categorySet).sort();
  }, []);

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || business.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <Hero
        title="Showcase & Marketplace"
        subtitle="Discover amazing businesses and products created by women entrepreneurs in our community."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'businesses' 
                ? 'btn-primary' 
                : 'border-2 hover:transform hover:-translate-y-1'
            }`}
            style={activeTab === 'businesses' ? {} : { 
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
          >
            <Briefcase className="h-5 w-5 inline mr-2" />
            Business Directory
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'products' 
                ? 'btn-primary' 
                : 'border-2 hover:transform hover:-translate-y-1'
            }`}
            style={activeTab === 'products' ? {} : { 
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
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
              placeholder={activeTab === 'businesses' ? 'Search businesses by name, owner, or description...' : 'Search products by name, description, or seller...'}
            />
            
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field pl-10 pr-4 py-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">All Categories</option>
                  {(activeTab === 'businesses' ? businessCategories : productCategories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                        style={{ color: 'var(--text-secondary)' }} />
              </div>
            </div>
          </div>

          {/* Businesses Tab */}
          {activeTab === 'businesses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
                </p>
                <button className="btn-primary inline-flex items-center space-x-2 px-4 py-2 font-medium rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span>List Your Business</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <div key={business.id} className="card p-6">
                    <div className="text-center mb-4">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        loading="lazy"
                      />
                      <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {business.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                        by {business.owner}
                      </p>
                      <span
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ 
                          backgroundColor: 'var(--tertiary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {business.category}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                      {business.description}
                    </p>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedBusiness(business)}
                        className="btn-primary w-full py-2 font-medium rounded-lg"
                      >
                        Learn More
                      </button>
                      <a
                        href={`mailto:${business.contact}`}
                        className="w-full py-2 font-medium rounded-lg border-2 text-center block transition-colors hover:bg-opacity-10"
                        style={{ 
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)'
                        }}
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    No businesses found
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
                <button className="btn-primary inline-flex items-center space-x-2 px-4 py-2 font-medium rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span>Add Your Product</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card overflow-hidden group cursor-pointer"
                       onClick={() => setSelectedProduct(product)}>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: 'var(--primary)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                        {product.name}
                      </h3>
                      <p className="text-sm mb-2 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold" style={{ color: 'var(--primary)' }}>
                          {product.price}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          by {product.seller}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    No products found
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

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
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {selectedBusiness.name}
              </h2>
              <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
                Founded by {selectedBusiness.owner}
              </p>
              <span
                className="px-4 py-2 rounded-full"
                style={{ 
                  backgroundColor: 'var(--tertiary)',
                  color: 'var(--text-primary)'
                }}
              >
                {selectedBusiness.category}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                About the Business
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {selectedBusiness.description}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a
                href={`mailto:${selectedBusiness.contact}`}
                className="btn-primary flex-1 inline-flex items-center justify-center space-x-2 py-3 font-medium rounded-lg"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Business</span>
              </a>
              <button className="flex-1 py-3 font-medium rounded-lg border-2 transition-colors hover:bg-opacity-10"
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
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />
            
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {selectedProduct.category}
                </span>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  by {selectedProduct.seller}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedProduct.price}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Product Description
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {selectedProduct.description}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button className="btn-primary flex-1 py-3 font-medium rounded-lg">
                Contact Seller
              </button>
              <button className="flex-1 py-3 font-medium rounded-lg border-2 transition-colors hover:bg-opacity-10"
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