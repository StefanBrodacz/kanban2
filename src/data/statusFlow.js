export default {
  statuses: [
    {
      id: 1,
      title: "Nowy",
      position: { x: 155, y: 286 },
      link: [
        { targetId: 2, node: { out: 5, in: 6 }, in: { socket: 6 } },
        { targetId: 2, node: { out: 4, in: 10 }, in: { socket: 10 } }
      ],
      width: 182,
      height: 40
    },
    {
      id: 2,
      title: "Analizowany",
      position: { x: 447, y: 134 },
      link: [{ targetId: 3, node: { out: 5, in: 1 }, in: { socket: 1 } }],
      width: 182,
      height: 40
    },
    {
      id: 3,
      title: "Do realizacji",
      position: { x: 1302, y: 126 },
      link: [{ targetId: 4, node: { out: 5, in: 1 }, in: { socket: 1 } }],
      width: 182,
      height: 40
    },
    {
      id: 4,
      title: "W trakcie",
      position: { x: 1172, y: 274 },
      link: [
        { targetId: 41, node: { out: 1, in: 5 }, in: { socket: 5 } },
        { targetId: 42, node: { out: 2, in: 1 }, in: { socket: 1 } },
        {
          targetId: 5,
          node: { out: 10, in: 2 },
          in: { position: { x: 1290, y: 315 }, socket: 2 }
        }
      ],
      width: 182,
      height: 40
    },
    {
      id: 41,
      title: "Need feedback",
      position: { x: 1202, y: 682 },
      link: [
        { targetId: 1, node: { out: 2, in: 9 }, in: { socket: 9 } },
        { targetId: 43, node: { out: 3, in: 7 }, in: { socket: 7 } },
        { targetId: 10, node: { out: 1, in: 10 }, in: { socket: 10 } }
      ],
      width: 182,
      height: 40
    },
    {
      id: 43,
      title: "Waiting for feedback",
      position: { x: 337, y: 574 },
      link: [
        { targetId: 1, node: { out: 1, in: 10 }, in: { socket: 10 } },
        { targetId: 10, node: { out: 2, in: 8 }, in: { socket: 8 } },
        { targetId: 10, node: { out: 4, in: 7 }, in: { socket: 7 } }
      ],
      width: 182,
      height: 40
    },
    {
      id: 42,
      title: "Reopen",
      position: { x: 1019, y: 389 },
      link: [{ targetId: 4, node: { out: 1, in: 10 }, in: { socket: 10 } }],
      width: 182,
      height: 40
    },
    {
      id: 5,
      title: "Wykonane",
      position: { x: 1368, y: 572 },
      link: [{ targetId: 6, node: { out: 5, in: 6 }, in: { socket: 6 } }],
      width: 182,
      height: 40
    },
    {
      id: 6,
      title: "Czeka na tag",
      position: { x: 1549, y: 404 },
      link: [{ targetId: 7, node: { out: 5, in: 7 }, in: { socket: 7 } }],
      width: 182,
      height: 40
    },
    {
      id: 7,
      title: "Do realizacji w QA",
      position: { x: 1592, y: 228 },
      link: [{ targetId: 8, node: { out: 5, in: 1 }, in: { socket: 1 } }],
      width: 182,
      height: 40
    },
    {
      id: 8,
      title: "W testach QA",
      position: { x: 862, y: 548 },
      link: [
        { targetId: 9, node: { out: 5, in: 6 }, in: { socket: 6 } },
        { targetId: 42, node: { out: 1, in: 9 }, in: { socket: 9 } }
      ],
      width: 182,
      height: 40
    },
    {
      id: 9,
      title: "Gotowe do wydania",
      position: { x: 722, y: 268 },
      link: [
        { targetId: 10, node: { out: 5, in: 1 }, in: { socket: 1 } },
        { targetId: 9, node: { out: 4, in: 2 }, in: { socket: 2 } }
      ],
      width: 182,
      height: 40
    },
    {
      id: 10,
      title: "DONE",
      position: { x: 541, y: 441 },
      link: [
        { targetId: 1, node: { out: 5, in: 6 }, in: { socket: 6 } },
        { targetId: 10, node: { out: 3, in: 4 }, in: { socket: 4 } },
        { targetId: 9, node: { out: 2, in: 8 }, in: { socket: 8 } }
      ],
      width: 182,
      height: 40
    }
  ]
};
