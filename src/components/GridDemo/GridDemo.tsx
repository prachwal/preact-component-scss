import { Card } from '../Card';
import { Button } from '../Button';

export function GridDemo() {
  const cards = [
    { title: 'Card 1', content: 'First card content', variant: 'default' as const },
    { title: 'Card 2', content: 'Second card content', variant: 'elevated' as const },
    { title: 'Card 3', content: 'Third card content', variant: 'outlined' as const },
    { title: 'Card 4', content: 'Fourth card content', variant: 'filled' as const },
    { title: 'Card 5', content: 'Fifth card content', variant: 'default' as const },
    { title: 'Card 6', content: 'Sixth card content', variant: 'elevated' as const },
    { title: 'Card 7', content: 'Seventh card content', variant: 'outlined' as const },
    { title: 'Card 8', content: 'Eighth card content', variant: 'filled' as const },
    { title: 'Card 9', content: 'Ninth card content', variant: 'default' as const },
    { title: 'Card 10', content: 'Tenth card content', variant: 'elevated' as const },
    { title: 'Card 11', content: 'Eleventh card content', variant: 'outlined' as const },
    { title: 'Card 12', content: 'Twelfth card content', variant: 'filled' as const },
  ];

  return (
    <section class="demo-section">
      <h2>Responsive Grid Demo</h2>
      <p>6 columns on desktop, 3 on tablet, 1 on mobile</p>
      <div class="demo-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            variant={card.variant}
            size="small"
          >
            <p>{card.content}</p>
            <Button size="small" variant="primary">
              Action {index + 1}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}