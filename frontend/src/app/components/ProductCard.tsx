import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Product } from '../types/product';
import { isVideoMediaUrl } from '../utils/media';
import { useCart } from '../contexts/CartContext';
import { useCartIcon } from '../contexts/CartIconContext';
import { AddToCartAnimation } from './AddToCartAnimation';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { cartIconElement } = useCartIcon();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPositions, setAnimationPositions] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (event: React.MouseEvent) => {
    // Let the card link open the detail page so customers can choose a length.
    if (product.soldBy === 'meter') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

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
        },
      });

      setShowAnimation(true);
    }

    addToCart(product);
  };

  const variantsCount = product.variants?.length ?? 0;
  const primaryMedia = product.image || product.images?.[0] || '';
  const discountPercentage = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="h-full cursor-pointer gap-0 overflow-hidden rounded-none border border-border/70 bg-card p-0 shadow-none transition-colors duration-200 group-hover:border-foreground/25">
          <div className="relative aspect-[4/5] bg-[#f7f7f7] dark:bg-muted">
            {isVideoMediaUrl(primaryMedia) ? (
              <video
                src={primaryMedia}
                aria-label={`${product.name} product video`}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full select-none object-contain"
              />
            ) : (
              <img
                src={primaryMedia}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full select-none object-contain"
              />
            )}

            {variantsCount > 1 && (
              <span className="absolute bottom-0 left-0 right-0 bg-white/95 px-2 py-1.5 text-left text-[11px] font-medium text-[#007185] underline underline-offset-2 dark:bg-card/95 dark:text-sky-400 md:text-xs">
                +{variantsCount - 1} other {variantsCount === 2 ? 'style' : 'styles'}
              </span>
            )}

            {!product.inStock && (
              <Badge
                variant="destructive"
                className="absolute left-2.5 top-2.5 rounded-none border-none bg-red-600 text-[10px] font-semibold text-white shadow-md md:text-xs"
              >
                Out of Stock
              </Badge>
            )}
          </div>

          <CardContent className="flex flex-1 flex-col bg-transparent px-2.5 pb-3 pt-2.5 text-left [&:last-child]:pb-3 md:px-3">
            <p className="truncate text-sm font-semibold text-foreground">{product.brand}</p>
            <h3 className="mt-0.5 line-clamp-2 min-h-10 text-sm font-normal leading-5 text-foreground sm:text-[15px]">
              {product.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-xl font-medium text-foreground md:text-2xl">
                <span className="align-top text-xs md:text-sm">₹</span>
                {product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-foreground">({discountPercentage}% off)</span>
                </>
              )}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            {product.inStock && (
              <div className="mt-3" ref={buttonRef}>
                <Button
                  onClick={handleAddToCart}
                  className="h-9 w-full rounded-full bg-[#ffd814] text-sm font-medium text-[#0f1111] shadow-none hover:bg-[#f7ca00]"
                >
                  {product.soldBy === 'meter' ? 'View options' : 'Add to cart'}
                </Button>
              </div>
            )}
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
