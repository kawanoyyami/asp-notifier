import { Service } from './types';

export type BranchKey = 'Chisinau_Riscani' | 'Chisinau_Buiucani' | 'Chisinau_Botanica';

export const Branches: Record<BranchKey, { id: string; displayName: string }> = {
  Chisinau_Riscani: {
    id: '9c93477f3ac5814a4c29f35b35089992704c8b0fb90ac3da9651f39515265370',
    displayName: 'Chișinău Rîșcani',
  },
  Chisinau_Buiucani: {
    id: 'cf02955299edc7a0e12a09d04cc715c10abf01655e66849c45b357cbd6f11d1c',
    displayName: 'Chișinău Buiucani',
  },
  Chisinau_Botanica: {
    id: '01cec8bf73e969459fbafe6c243618c9a0face8de1af6b02c50cff8eea1b0d5c',
    displayName: 'Chișinău Botanica',
  },
};

export const Services: Service[] = [
  {
    name: 'Examen practic. Cat. B [trafic] cutia [mecanica]',
    id: 'f4bac1a2f8d6e023084cfe8fd845a0ae68c776c6ab138622b5d864f59408b0b8',
  },
  {
    name: 'Examen practic. Cat. B [trafic] cutia [automat]',
    id: '5f376aa9ee13b5ad5acf17162d973b340f92d305dfb5580e7cea2783ceedce42',
  },
  {
    name: 'Urgenta. Examen practic. Cat. B [trafic] cutia [mecanica]',
    id: '4ffa5fb827ee29695424a2056f450f095b752d44ded3d9c78ed8908dd5a6f086',
  },
  {
    name: 'Urgenta. Examen practic. Cat. B [trafic] cutia [automat]',
    id: 'fbf0310af9f9ef0503d1fd0ab4ac152e9cae44fa198956649ff367d0376d0fb7',
  },
];

export const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
];