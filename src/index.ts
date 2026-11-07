const t = [
    "my b dog", 
    "sry", 
    "sorry"
];

export default {
  fetch: () =>
    new Response(t[Math.floor(Math.random() * t.length)], {
      headers: { "content-type": "text/plain; charset=utf-8" },
    }),
};
