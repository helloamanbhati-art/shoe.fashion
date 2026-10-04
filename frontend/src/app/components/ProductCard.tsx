import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageCarousel } from './ImageCarousel';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCartIcon } from '../contexts/CartIconContext';
import { AddToCartAnimation } from './AddToCartAnimation';
import { useState, useRef } from 'react';
import { isVideoMediaUrl } from '../utils/media';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { cartIconElement } = useCartIcon();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPositions, setAnimationPositions] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For meter products, user must go to product detail page to select meters
    if (product.soldBy === 'meter') {
      // Navigate to product detail - handled by the Link wrapper
      return;
    }

    if (buttonRef.current && cartIconElement) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const cartRect = cartIconElement.getBoundingClientRect();

      setAnimationPositions({
        start: {
          x: buttonRect.left + buttonRect.width / 2 - 30,
          y: buttonRect.top + buttonRect.height / 2 - 30,
        },
        end: {
          x: cartRect.left + cartRect.width / 2 - 30,
          y: cartRect.top + cartRect.height / 2 - 30,
        }
      });

      setShowAnimation(true);
      addToCart(product);
    }
  };

  const variantsCount = product.variants ? product.variants.length : 0;
  const primaryMedia = product.image || (product.images && product.images[0]) || '';

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="cursor-pointer gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-border group-hover:shadow-md">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
            {isVideoMediaUrl(primaryMedia) ? (
              <video
                src={primaryMedia}
                aria-label={`${product.name} product video`}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <img
                src={primaryMedia}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {variantsCount > 1 && (
              <span className="absolute bottom-2.5 right-2.5 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-none shadow-sm z-10">
                +{variantsCount - 1} More
              </span>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-2.5 left-2.5 font-semibold text-[10px] md:text-xs bg-red-600 text-white border-none rounded-none shadow-md z-10">
                Out of Stock
              </Badge>
            )}
            {/* Quick Add Button */}
            {product.inStock && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" ref={buttonRef}>
                <Button
                  size="icon"
                  onClick={handleAddToCart}
                  className="rounded-none shadow-lg"
                >
                  <ShoppingCart className="size-4" />
                </Button>
              </div>
            )}
          </div>
          <CardContent className="space-y-1 bg-transparent px-2 pb-2 pt-3 text-center [&:last-child]:pb-2">
            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
              {product.name}
            </h3>
            <div className="font-bold text-base md:text-lg text-emerald-600 dark:text-emerald-400">
              ₹{product.price.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </Link>

      {showAnimation && (
        <AddToCartAnimation
          show={showAnimation}
          startPosition={animationPositions.start}
          endPosition={animationPositions.end}
          productImage={product.image}
          onComplete={() => setShowAnimation(false)}
        />
      )}
    </>
  );
}
