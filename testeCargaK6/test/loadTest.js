// Tarefa 1: Utilizando K6, e crie um teste de carga básico para uma API pública (pode ser uma API de mock). 
// Configure para simular 500 usuários simultâneos por 5 minutos.

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '5m',
};

const API_KEY = __ENV.API_KEY;

export default function () {
  const url = 'https://api.funtranslations.com/translate/yoda.json';
  const payload = JSON.stringify({
    text: 'Train yourself to let go of everything you fear to lose.'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-Funtranslations-Api-Secret': API_KEY,
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has contents': (r) => r.body && r.body.length > 0,
  });

  sleep(Math.random() * 2);
}