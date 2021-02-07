export default {
  statuses: [
    {
      id: 1,
      title: "Nowy",
      position: { x: 99, y: 96 },
      link: [
        {
          targetId: 2,
          node: { out: 5, in: 1 },
          in: { position: { x: 268, y: 40 }, socket: 1 }
        },
        {
          targetId: 2,
          node: { out: 4, in: 2 },
          in: { position: { x: 274, y: 40 }, socket: 2 }
        }
      ],
      width: 98
    },
    {
      id: 2,
      title: "Analizowany",
      position: { x: 263, y: 40 },
      link: [
        {
          targetId: 3,
          node: { out: 5, in: 1 },
          in: { position: { x: 1082, y: 103 }, socket: 1 }
        }
      ],
      width: 103
    },
    {
      id: 3,
      title: "Do realizacji",
      position: { x: 1077, y: 103 },
      link: [
        {
          targetId: 4,
          node: { out: 5, in: 1 },
          in: { position: { x: 1025, y: 279 }, socket: 1 }
        }
      ],
      width: 100
    },
    {
      id: 4,
      title: "W trakcie",
      position: { x: 1020, y: 279 },
      link: [
        {
          targetId: 5,
          node: { out: 5, in: 1 },
          in: { position: { x: 1200, y: 509 }, socket: 1 }
        },
        {
          targetId: 41,
          node: { out: 1, in: 5 },
          in: { position: { x: 643, y: 521 }, socket: 5 }
        },
        {
          targetId: 42,
          node: { out: 2, in: 1 },
          in: { position: { x: 946, y: 529 }, socket: 1 }
        }
      ],
      width: 98
    },
    {
      id: 41,
      title: "Need feedback",
      position: { x: 614, y: 521 },
      link: [
        {
          targetId: 1,
          node: { out: 2, in: 4 },
          in: { position: { x: 122, y: 96 }, socket: 4 }
        },
        {
          targetId: 43,
          node: { out: 3, in: 4 },
          in: { position: { x: 297, y: 410 }, socket: 4 }
        }
      ],
      width: 117
    },
    {
      id: 43,
      title: "Waiting for feedback",
      position: { x: 274, y: 410 },
      link: [
        {
          targetId: 1,
          node: { out: 1, in: 5 },
          in: { position: { x: 128, y: 96 }, socket: 5 }
        },
        {
          targetId: 10,
          node: { out: 2, in: 5 },
          in: { position: { x: 381, y: 232 }, socket: 5 }
        },
        {
          targetId: 10,
          node: { out: 4, in: 6 },
          in: { position: { x: 387, y: 232 }, socket: 6 }
        }
      ],
      width: 149
    },
    {
      id: 42,
      title: "Reopen",
      position: { x: 941, y: 529 },
      link: [
        {
          targetId: 4,
          node: { out: 1, in: 6 },
          in: { position: { x: 1055, y: 279 }, socket: 6 }
        }
      ],
      width: 98
    },
    {
      id: 5,
      title: "Wykonane",
      position: { x: 1195, y: 509 },
      link: [
        {
          targetId: 6,
          node: { out: 5, in: 1 },
          in: { position: { x: 1337, y: 372 }, socket: 1 }
        }
      ],
      width: 98
    },
    {
      id: 6,
      title: "Czeka na tag",
      position: { x: 1332, y: 372 },
      link: [
        {
          targetId: 7,
          node: { out: 5, in: 1 },
          in: { position: { x: 1340, y: 68 }, socket: 1 }
        }
      ],
      width: 105
    },
    {
      id: 7,
      title: "Do realizacji w QA",
      position: { x: 1335, y: 68 },
      link: [
        {
          targetId: 8,
          node: { out: 5, in: 1 },
          in: { position: { x: 765, y: 357 }, socket: 1 }
        }
      ],
      width: 134
    },
    {
      id: 8,
      title: "W testach QA",
      position: { x: 760, y: 357 },
      link: [
        {
          targetId: 9,
          node: { out: 5, in: 1 },
          in: { position: { x: 549, y: 136 }, socket: 1 }
        },
        {
          targetId: 42,
          node: { out: 1, in: 5 },
          in: { position: { x: 970, y: 529 }, socket: 5 }
        }
      ],
      width: 109
    },
    {
      id: 9,
      title: "Gotowe do wydania",
      position: { x: 544, y: 136 },
      link: [
        {
          targetId: 10,
          node: { out: 5, in: 1 },
          in: { position: { x: 357, y: 232 }, socket: 1 }
        }
      ],
      width: 143
    },
    {
      id: 10,
      title: "DONE",
      position: { x: 352, y: 232 },
      link: [
        {
          targetId: 1,
          node: { out: 5, in: 1 },
          in: { position: { x: 104, y: 96 }, socket: 1 }
        }
      ],
      width: 98
    }
  ]
};
