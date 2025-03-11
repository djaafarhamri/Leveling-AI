'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { WorldMap } from '../components/world-map';
import { LoreBook } from '../components/lore-book';
import { RegionChallenges } from '../components/region-challenges';
import { Map, BookOpen, Trophy } from 'lucide-react';

export default function WorldPage() {
  const [selectedRegion,] = useState('mountains-of-focus');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">World of Productiva</h1>
        <p className="text-muted-foreground">
          Explore regions, discover lore, and complete challenges
        </p>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            World Map
          </TabsTrigger>
          <TabsTrigger value="lore" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lore Book
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Region Challenges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <WorldMap />
        </TabsContent>

        <TabsContent value="lore" className="mt-6">
          <LoreBook />
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="space-y-4">
            <RegionChallenges regionId={selectedRegion} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
