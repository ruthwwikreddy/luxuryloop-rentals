
import { useState } from "react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { ReviewType } from "@/types/supabase";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
  reviews?: ReviewType[];
}

const ReviewsSection = ({ reviews = [] }: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const averageRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
    
  return (
    <div className="glass-card rounded-lg gold-border p-8 mb-8">
      <h2 className="font-playfair text-2xl text-white flex items-center mb-4">
        <MessageCircle className="mr-2 h-6 w-6 text-luxury-gold" />
        Customer Reviews
      </h2>
      
      {reviews.length > 0 ? (
        <>
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) 
                      ? "text-luxury-gold fill-luxury-gold" 
                      : "text-white/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-medium">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
          
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <span className="text-luxury-gold font-medium">{review.name}</span>
                  <span className="text-white/50 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? "text-luxury-gold fill-luxury-gold" 
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/70">{review.comment}</p>
                <div className="flex items-center mt-3">
                  <button className="flex items-center text-white/50 hover:text-luxury-gold transition-colors text-sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {reviews.length > 3 && (
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                className="btn-outline-luxury"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show All Reviews"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-white/70 text-center py-6">No reviews yet for this vehicle.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
