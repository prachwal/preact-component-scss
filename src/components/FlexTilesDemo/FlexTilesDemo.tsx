import { Card } from '../Card';
import { Button } from '../Button';
import { ICONS } from '../../constants/icons';

export function FlexTilesDemo() {
  const tiles = [
    {
      title: 'Welcome',
      content: 'Welcome to our component library demo. This showcases flex-based tile layout.',
      icon: ICONS.home,
      variant: 'elevated' as const,
      size: 'large' as const
    },
    {
      title: 'Components',
      content: 'Explore our collection of reusable Preact components with TypeScript support.',
      icon: ICONS.puzzle,
      variant: 'outlined' as const,
      size: 'medium' as const
    },
    {
      title: 'Responsive',
      content: 'All components are fully responsive and work great on any device size.',
      icon: ICONS.phone,
      variant: 'filled' as const,
      size: 'medium' as const
    },
    {
      title: 'Theme Support',
      content: 'Dark/light theme support with automatic system preference detection.',
      icon: ICONS.moon,
      variant: 'default' as const,
      size: 'medium' as const // Changed from small to medium for longer content
    },
    {
      title: 'TypeScript',
      content: 'Full TypeScript support with comprehensive type definitions.',
      icon: ICONS.pencil,
      variant: 'elevated' as const,
      size: 'medium' as const // Changed from small to medium for longer content
    },
    {
      title: 'Performance',
      content: 'Optimized for performance with Preact signals and efficient re-rendering.',
      icon: ICONS.bolt,
      variant: 'outlined' as const,
      size: 'large' as const
    }
  ];

  return (
    <section class="demo-section">
      <h2>Flex Tiles Demo</h2>
      <p>Flexible tile layout that adapts to available space</p>
      <div class="demo-flex-tiles">
        {tiles.map((tile, index) => (
          <div key={index} class="demo-tile">
            <Card
              title={tile.title}
              variant={tile.variant}
              size={tile.size}
              icon={<span style={{ fontSize: '1.5em' }}>{tile.icon}</span>}
            >
              <p>{tile.content}</p>
              <Button size="small" variant="primary">
                Learn More
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}