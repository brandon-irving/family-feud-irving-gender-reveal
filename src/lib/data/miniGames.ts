import { MiniGame } from '@/lib/types';

const miniGames: MiniGame[] = [
  {
    title: 'Stork Drop Off',
    itemsNeeded: [
      'Muffin pan (12 count)',
      'Ping pong ball',
      'Flat surface (like a table)',
      'Paper',
    ],
    setup:
      'Write 1,2,3,4 on 12 pieces of paper and place them in the muffin pan in the following fashion: 1111, 2222, 3333, 4444.',
    rules:
      'Two teams line up and take turns bouncing the ping pong ball into the muffin pan. Each muffin spot a ball lands in, the team gets that many points once. The team with the most points in 5 minutes wins.',
  },
  {
    title: "Baby's First Breath",
    itemsNeeded: ['Paper cup', '2 Balloons'],
    setup:
      'Place a cup between both teams. Each team lines up on opposing sides of the cup.',
    rules:
      'One by one, team members will face off against each other, using their balloon to blow the cup off the table onto the opposing side. The team with the most victories wins.',
  },
  {
    title: 'Baby Straw Dash',
    itemsNeeded: ['X Straws (1 per team member)', '2 Water bottles'],
    setup:
      'Both teams line up several feet away from a table with 2 slightly filled water bottles on it. Each player is given a straw.',
    rules:
      'A relay race in which each team must transport a straw to the water bottle by holding it between their nose and lips. If the straw drops, the player must spin three times before resuming the race. The team with no straws left first wins.',
  },
  {
    title: 'Baby Bump Bounce',
    itemsNeeded: [
      '2 Ping pong balls',
      'X Cups',
      'X Balloons',
      'X Amount of string (to tie the cup to the baby bump)',
    ],
    setup:
      'Attach string to the cup and tie the cup to the baby bump. Divide the team into bumpers and bouncers.',
    rules:
      'Bumpers wear the baby bump and cup while bouncers try to bounce the ping pong ball into the cup. The first team to get all their balls into the cups wins.',
  },
  {
    title: 'London Bridge',
    itemsNeeded: ['Some device that dangles between your legs', 'Blindfold'],
    setup: 'Attach the dangling device and set up 5 cups at equal distances.',
    rules:
      'Blindfolded workers must knock down cups with the waist-tied device, while builders direct them. The team to finish 3 rounds first wins.',
  },
  {
    title: 'Baby Name Generators',
    itemsNeeded: ['Randomizer App', 'Notebook'],
    setup:
      'Teams line up in alternating order. A prompt will display a name criteria.',
    rules:
      'Each player has 5 seconds to come up with a name that satisfies the criteria. Each failure results in a strike. The first team with 3 strikes loses.',
  },
];

export default miniGames;
