'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import { BookOpen, Bookmark, ChevronLeft, ChevronRight, Scroll } from 'lucide-react';

interface LoreEntry {
  id: string;
  title: string;
  content: string;
  category: 'World' | 'Character' | 'Quest' | 'Achievement';
  discovered: boolean;
}

export function LoreBook() {
  const { theme } = useTheme();
  const [currentCategory, setCurrentCategory] = useState<
    'World' | 'Character' | 'Quest' | 'Achievement'
  >('World');
  const [currentPage, setCurrentPage] = useState(0);

  // Define lore entries
  const loreEntries: LoreEntry[] = [
    // World Lore
    {
      id: 'world-origin',
      title: 'The Origin of Productiva',
      content:
        "Long ago, the realm of Productiva was created by the ancient Architects of Time, beings who understood that the greatest resource in any universe is not gold or magic, but time itself. They crafted this realm as a training ground where mortals could learn to harness their potential and transform time into achievement.\n\nThe Architects established the four cardinal virtues - Focus, Knowledge, Discipline, and Connection - each represented by a region in the realm. They created challenges to test these virtues and rewards to strengthen them.\n\n'In Productiva,' they decreed, 'one's level is not determined by birth or luck, but by consistent effort and growth. Here, every mortal can become legendary through their own actions.'",
      category: 'World',
      discovered: true,
    },
    {
      id: 'world-regions',
      title: 'The Six Regions',
      content:
        'Productiva is divided into six distinct regions, each with its own challenges and rewards:\n\nThe Mountains of Focus rise in the north, where the air is clear and distractions few. Those who climb these peaks learn to concentrate their mind like a laser beam.\n\nThe Knowledge Forest spreads across the eastern lands, its ancient trees containing libraries of wisdom. Scholars and learners find their minds expanding as they explore its depths.\n\nThe Discipline Citadel stands in the central plains, an imposing fortress where willpower is forged through consistent practice and habit formation.\n\nThe Social Metropolis bustles in the west, a city of a thousand conversations where the art of connection is mastered.\n\nThe Creativity Shores line the southern coast, where innovation flows like the tides and imagination takes physical form.\n\nThe Mastery Peaks, highest of all, are shrouded in clouds. Few reach these summits, but those who do gain insights that transform their entire journey.',
      category: 'World',
      discovered: true,
    },
    {
      id: 'world-time-cycles',
      title: 'The Cycles of Time',
      content:
        'Productiva experiences unique temporal patterns known as the Cycles of Time. These cycles influence how challenges manifest and how rewards accumulate.\n\nThe Daily Cycle is the most fundamental rhythm. Each dawn brings new opportunities and challenges that must be completed before nightfall.\n\nThe Weekly Cycle governs larger patterns, bringing more substantial challenges that test endurance and consistency.\n\nThe Monthly Cycle introduces rare challenges that appear only when the moon is full, offering exceptional rewards for those prepared to face them.\n\nThe Seasonal Cycle transforms the entire realm four times each year, bringing festivals, special events, and unique challenges tied to the changing environment.\n\nMasters of Productiva learn to align their efforts with these cycles, maximizing their growth by understanding the ebb and flow of time itself.',
      category: 'World',
      discovered: true,
    },

    // Character Lore
    {
      id: 'character-classes',
      title: 'The Four Character Classes',
      content:
        'In Productiva, adventurers naturally develop along one of four primary paths, though many combine elements from multiple traditions:\n\nProductivity Warriors excel in discipline and focus, conquering tasks through sheer determination and efficient systems. Their strength lies in consistent execution and overcoming procrastination through force of will.\n\nKnowledge Mages master the acquisition and application of information. They transform learning into power, using their vast understanding to solve complex problems and create innovative solutions.\n\nVitality Rangers maintain balance between mind, body, and spirit. They draw strength from physical wellness, emotional resilience, and connection with nature, allowing them to sustain effort where others falter.\n\nSocial Bards build networks and influence through exceptional communication. Their power comes from collaboration, leadership, and the ability to inspire others to join their quests.\n\nWhile most adventurers have a primary affinity, the greatest masters of Productiva develop capabilities across all four traditions, creating unique combinations that suit their personal journey.',
      category: 'Character',
      discovered: true,
    },
    {
      id: 'character-leveling',
      title: 'The Path of Advancement',
      content:
        "Advancement in Productiva follows natural laws that the Architects wove into the fabric of the realm:\n\nAll growth begins with action. No advancement occurs through mere planning or intention - only through completed challenges does an adventurer's level increase.\n\nConsistency outweighs intensity. Regular, sustained effort yields greater advancement than occasional bursts of extreme activity followed by abandonment.\n\nMastery requires focus. While breadth of experience builds a well-rounded adventurer, true leveling demands depth in chosen disciplines.\n\nChallenges must escalate. The body and mind adapt to repeated stimuli, requiring progressively difficult challenges to continue advancement.\n\nRest is essential. The recovery period between challenges is when true growth occurs, as the mind integrates lessons and the will strengthens for the next test.\n\nThese principles guide all advancement in Productiva, from novice to legendary master.",
      category: 'Character',
      discovered: true,
    },

    // Quest Lore
    {
      id: 'quest-origins',
      title: 'The Nature of Quests',
      content:
        "Quests in Productiva are not merely tasks to be completed, but transformative journeys that reshape the adventurer who undertakes them.\n\nThe simplest quests - Daily Challenges - are like individual steps on a path. Each one small, but together forming a journey of considerable distance.\n\nWeekly Quests require sustained effort and planning, testing an adventurer's ability to maintain focus across multiple days.\n\nMonthly Sagas demand strategic thinking and resource management, often involving multiple stages and diverse skills.\n\nEpic Quests may require months to complete, transforming not just the adventurer's abilities but their very identity. These quests often involve mastering entirely new disciplines or creating works that benefit the entire realm.\n\nThe most legendary adventurers understand that the true purpose of any quest is not the external reward, but the internal transformation that occurs through its completion.",
      category: 'Quest',
      discovered: true,
    },

    // Achievement Lore
    {
      id: 'achievement-history',
      title: 'The Hall of Legends',
      content:
        "Deep within the heart of Productiva stands the Hall of Legends, a vast chamber where the achievements of the greatest adventurers are recorded for all time.\n\nThe walls of this sacred space are lined with crystalline tablets that glow with inner light. Each tablet records not just what was accomplished, but how the achievement transformed both the adventurer and the realm itself.\n\nUnlike ordinary records, these tablets capture the essence of the achievement - the struggles overcome, the growth experienced, the moment of triumph. Visitors to the Hall don't merely read about these feats; they experience echoes of the actual achievement, gaining inspiration and insight.\n\nThe Architects created the Hall to ensure that no worthy accomplishment would ever be forgotten, and to remind all adventurers that their efforts create ripples that extend far beyond themselves.\n\nIt is said that when an adventurer completes a truly legendary achievement, they can hear the distant chime of a new tablet being created in their honor, even if they are on the other side of the realm.",
      category: 'Achievement',
      discovered: true,
    },
  ];

  // Filter entries by category and discovery status
  const filteredEntries = loreEntries.filter(
    (entry) => entry.category === currentCategory && entry.discovered
  );

  // Get current entry
  const currentEntry = filteredEntries[currentPage];

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < filteredEntries.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get theme-specific classes
  const getLoreBookClass = () => {
    switch (theme) {
      case 'elden-ring':
        return 'world-elden-bg border world-elden-border';
      case 'league':
        return 'world-league-bg border world-league-border';
      case 'wow':
        return 'world-wow-bg border world-wow-border';
      default:
        return '';
    }
  };

  // Update the getCategoryButtonClass function to use our new custom classes
  const getCategoryButtonClass = (category: 'World' | 'Character' | 'Quest' | 'Achievement') => {
    const isActive = category === currentCategory;

    if (theme === 'elden-ring') {
      return isActive
        ? 'world-elden-highlight-bg border world-elden-highlight-border text-amber-100'
        : 'world-elden-bg border world-elden-border text-amber-200/70 hover:world-elden-highlight-bg hover:world-elden-highlight-border';
    } else if (theme === 'league') {
      return isActive
        ? 'world-league-highlight-bg border world-league-highlight-border text-blue-100'
        : 'world-league-bg border world-league-border text-blue-200/70 hover:world-league-highlight-bg hover:world-league-highlight-border';
    } else if (theme === 'wow') {
      return isActive
        ? 'world-wow-highlight-bg border world-wow-highlight-border text-yellow-100'
        : 'world-wow-bg border world-wow-border text-yellow-200/70 hover:world-wow-highlight-bg hover:world-wow-highlight-border';
    } else {
      return isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  return (
    <Card className={`${getLoreBookClass()} overflow-hidden`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Lore Book
        </CardTitle>
        <CardDescription>Discover the history and secrets of the realm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2">
          {(['World', 'Character', 'Quest', 'Achievement'] as const).map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`border ${getCategoryButtonClass(category)}`}
              onClick={() => {
                setCurrentCategory(category);
                setCurrentPage(0);
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Lore content */}
        {currentEntry && (
          <div className="space-y-4">
            <div className="relative h-[200px] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Scroll className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{currentEntry.title}</h3>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              {currentEntry.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm text-muted-foreground mb-3">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bookmark className="h-3 w-3" />
                <span>
                  {currentPage + 1} of {filteredEntries.length}
                </span>
              </div>
              <div>Category: {currentEntry.category}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage >= filteredEntries.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
