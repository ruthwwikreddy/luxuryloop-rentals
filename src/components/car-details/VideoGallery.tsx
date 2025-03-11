
import { useState } from "react";
import { Play, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoGalleryProps {
  videos?: string[];
  name: string;
}

const VideoGallery = ({ videos = [], name }: VideoGalleryProps) => {
  const [activeVideo, setActiveVideo] = useState(videos[0] || "");
  
  if (!videos || videos.length === 0) return null;
  
  return (
    <div className="glass-card rounded-lg gold-border p-8 mb-8">
      <h2 className="font-playfair text-2xl text-white flex items-center mb-6">
        <Video className="mr-2 h-6 w-6 text-luxury-gold" />
        Video Gallery
      </h2>
      
      <div className="mb-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-luxury-black/50 relative">
          {activeVideo ? (
            <iframe
              src={activeVideo}
              title={`${name} video`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/50">No video selected</p>
            </div>
          )}
        </div>
      </div>
      
      {videos.length > 1 && (
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-luxury-black">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div 
                  key={index}
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer relative bg-luxury-black/50 ${
                    activeVideo === video ? "ring-2 ring-luxury-gold" : ""
                  }`}
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="absolute inset-0 flex items-center justify-center group">
                    <Play className="h-10 w-10 text-luxury-gold opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-luxury-black/80 px-2 py-1 rounded text-xs text-white">
                    Video {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-4">
            <div className="space-y-3">
              {videos.map((video, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer flex items-center ${
                    activeVideo === video 
                      ? "bg-luxury-gold/20 text-luxury-gold" 
                      : "bg-luxury-black/50 text-white/70 hover:bg-luxury-black/70"
                  }`}
                  onClick={() => setActiveVideo(video)}
                >
                  <Play className="h-5 w-5 mr-3" />
                  <span>{name} - Video {index + 1}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default VideoGallery;
