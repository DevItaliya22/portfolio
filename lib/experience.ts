/**
 * Experience data - names, dates, links only. Sorted by most recent first.
 * Sub-sections: internships, freelance, learning, wanna-be-startups
 */

export type ExperienceCategory =
  | 'internship'
  | 'freelance'
  | 'learning'
  | 'wanna-be-startup';

export interface ExperienceItem {
  name: string;
  role?: string;
  roleLink?: { text: string; href: string };
  date: string;
  sortDate: string; // YYYY-MM-DD for sorting
  links: string[];
}

// Parse date to YYYY-MM-DD for sorting (most recent first)
function parseSortDate(dateStr: string): string {
  const months: Record<string, string> = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    june: '06',
    july: '07',
    jul: '07',
    aug: '08',
    sept: '09',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
  };
  if (dateStr.toLowerCase() === 'present') return '2099-12-31';
  const parts = dateStr.toLowerCase().replace(/,/g, '').split(/\s+/);
  if (parts.length >= 3) {
    const month = months[parts[0].replace(/^0/, '')] || parts[0];
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  if (parts.length === 2) {
    const month = months[parts[0]] || '01';
    const year = parts[1];
    return `${year}-${month}-01`;
  }
  return dateStr;
}

function item(
  name: string,
  date: string,
  links: string[] = [],
  role?: string,
  roleLink?: { text: string; href: string }
): ExperienceItem {
  return {
    name,
    role,
    roleLink,
    date,
    sortDate: parseSortDate(date),
    links: links.filter(Boolean),
  };
}

export const experienceByCategory: Record<
  ExperienceCategory,
  ExperienceItem[]
> = {
  internship: [
    item(
      'Buffindia',
      'Mar 1, 2025',
      [
        'https://buffindia.com/',
        // 'https://dev.buffindia.com/',
        // 'https://admin2.buffindia.com/signin',
        // 'https://admin3.buffindia.com/login',
        // 'https://admin4.buffindia.com/login',
        'https://feedback.buffindia.com',
        'https://contact.buffindia.com',
        'https://ecoart.buffindia.com',
      ],
      'full-stack developer'
    ),
    item(
      'Pattern Generator',
      'July 23, 2024',
      [],
      'frontend developer under ',
      {
        text: 'Harsh',
        href: 'https://www.linkedin.com/in/harsh-sutaria/',
      }
    ),
    item('Delfa Innovators', 'June 3, 2024', [], 'full-stack developer with ', {
      text: 'Aviral',
      href: 'https://www.linkedin.com/in/aviral-jain-20/',
    }),
  ],
  freelance: [
    item('Kakadiya Automobiles', 'Jan 15, 2025', [
      'https://www.kakadiyaautomobiles.com/',
    ]),
    item("K's Lunaloops", 'Jan 8, 2025', ['https://ks-lunaloop.vercel.app/']),
    item('Shuttle', 'Jul 22, 2025', ['https://shuttle.devitaliya.me/']),
    item('Agency Portfolio', 'Jul 8, 2025', ['https://agency.devitaliya.me/']),
    item('Cyro Technologies', 'Jul 15, 2025', []),
    item('Manish Vaghasiya', 'Sept 15, 2024', [
      'https://manishvaghasiya.devitaliya.me/',
    ]),
    item('VisualizeNBuild', 'Jul 10, 2025', [
      'https://vendor.visualizenbuild.com/login',
      'https://visualizenbuild.com',
    ]),
    item('Helpbharat', 'Jun 30, 2025', [
      'https://ash-deployment.vercel.app',
      'https://ash-deployment-pbq6.vercel.app/',
      'https://ash-deployment-hhwm.vercel.app/',
    ]),
    // item('StatusHive', 'Mar 13, 2025', ['https://statushive.devitaliya.me', 'https://github.com/DevItaliya22/StatusHive']),
    // item('Autominds', 'Sept 27, 2024', ['https://auto-minds-six.vercel.app/', 'https://github.com/DevItaliya22/AutoMinds']),
    // item('Accufin', 'Jun 9, 2025', ['https://accufin.vercel.app/']),
    // item('ShyamahShringar', 'Apr 6, 2025', []),
    // item('Twilio Call Management', 'May 20, 2025', ['https://call-managment.vercel.app']),
  ],
  learning: [
    item('Raycast WhatsApp Extension', 'Sept 8, 2025', [
      'https://github.com/DevItaliya22/raycast-whatsapp',
    ]),
    item('Alias - Terminal Productivity', 'Jul 21, 2025', [
      'https://github.com/DevItaliya22/Alias',
    ]),
    item('IntentJS Twitter Clone', 'Jan 11, 2025', [
      'https://github.com/DevItaliya22/Intentjs',
    ]),
    item('Pub Sub Messaging', 'Aug 12, 2024', [
      'https://github.com/DevItaliya22/PUB-SUB-2',
    ]),
    item('Kubernetes Learning', 'Sept 8, 2024', [
      'https://github.com/DevItaliya22/Kubernetes',
    ]),
  ],
  'wanna-be-startup': [
    item(
      'DY',
      'present',
      ['https://dy.devitaliya.me/', 'https://dyweb.devitaliya.me/login'],
      'co-founder with ',
      {
        text: 'Yash Katrodiya',
        href: 'https://www.linkedin.com/in/recellstechnology/',
      }
    ),
    item(
      'Sendpaper',
      'present',
      ['https://sendpaper.io/'],
      'co-founder with ',
      { text: 'Ashish', href: 'https://github.com/AshishViradiya153' }
    ),
  ],
};

// Sort each category by date descending (nearest/most recent on top)
function sortByDateDesc(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

// Apply sorting to all categories (freelance uses manual order)
Object.keys(experienceByCategory).forEach((key) => {
  const cat = key as ExperienceCategory;
  if (cat !== 'freelance') {
    experienceByCategory[cat] = sortByDateDesc(experienceByCategory[cat]);
  }
});

export const categoryLabels: Record<ExperienceCategory, string> = {
  internship: 'internships',
  freelance: 'freelance',
  learning: 'learning',
  'wanna-be-startup': "startups i'm building",
};

export const categoryOrder: ExperienceCategory[] = [
  'wanna-be-startup',
  'internship',
  'freelance',
  // 'learning',
];
