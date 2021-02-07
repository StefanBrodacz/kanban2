export default {
  type: "container",
  props: {
    orientation: "horizontal"
  },
  rows: [
    {
      id: 1,
      title: "John Doe",
      type: "container",
      props: {
        orientation: "horizontal"
      },
      columns: [
        {
          id: 1,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 12,
              props: {
                className: "card",
                style: { backgroundColor: "#cddeef" }
              },
              data: "card data4",
              timeline: {
                title: "Today",
                messages: [
                  {
                    from: "You",
                    message: `Sure, I'll see you later.`,
                    time: "10:42am",
                    color: "deep-purple lighten-1"
                  },
                  {
                    from: "John Doe",
                    message: "Yeah, sure. Does 1:00pm work?",
                    time: "10:37am",
                    color: "green"
                  },
                  {
                    from: "You",
                    message: "Did you still want to grab lunch today?",
                    time: "9:47am",
                    color: "deep-purple lighten-1"
                  }
                ]
              }
            },
            {
              type: "draggable",
              id: 13,
              props: {
                className: "card",
                style: { backgroundColor: "#dcb893" }
              },
              data: "card data3",
              timeline: null
            },
            {
              type: "draggable",
              id: 14,
              props: {
                className: "card",
                style: { backgroundColor: "#dcb893" }
              },
              data: "card data3",
              timeline: null
            }
          ]
        },
        {
          id: 2,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 14,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 15,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 3,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 24,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 25,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 4,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 34,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 35,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 5,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 54,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 55,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Evan You",
      type: "container",
      props: {
        orientation: "horizontal"
      },
      columns: [
        {
          id: 1,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 12,
              props: {
                className: "card",
                style: { backgroundColor: "#cddeef" }
              },
              data: "card data4",
              timeline: {
                title: "Today",
                messages: [
                  {
                    from: "You",
                    message: `Sure, I'll see you later.`,
                    time: "10:42am",
                    color: "deep-purple lighten-1"
                  },
                  {
                    from: "John Doe",
                    message: "Yeah, sure. Does 1:00pm work?",
                    time: "10:37am",
                    color: "green"
                  },
                  {
                    from: "You",
                    message: "Did you still want to grab lunch today?",
                    time: "9:47am",
                    color: "deep-purple lighten-1"
                  }
                ]
              }
            },
            {
              type: "draggable",
              id: 13,
              props: {
                className: "card",
                style: { backgroundColor: "#dcb893" }
              },
              data: "card data3",
              timeline: null
            }
          ]
        },
        {
          id: 2,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 14,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 15,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 3,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 24,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 25,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 5,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 24,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 25,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 4,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 34,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 35,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Evan You",
      type: "container",
      props: {
        orientation: "horizontal"
      },
      columns: [
        {
          id: 31,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 311,
              props: {
                className: "card",
                style: { backgroundColor: "#cddeef" }
              },
              data: "card data4",
              timeline: {
                title: "Today",
                messages: [
                  {
                    from: "You",
                    message: `Sure, I'll see you later.`,
                    time: "10:42am",
                    color: "deep-purple lighten-1"
                  },
                  {
                    from: "John Doe",
                    message: "Yeah, sure. Does 1:00pm work?",
                    time: "10:37am",
                    color: "green"
                  },
                  {
                    from: "You",
                    message: "Did you still want to grab lunch today?",
                    time: "9:47am",
                    color: "deep-purple lighten-1"
                  }
                ]
              }
            },
            {
              type: "draggable",
              id: 312,
              props: {
                className: "card",
                style: { backgroundColor: "#dcb893" }
              },
              data: "card data3",
              timeline: null
            }
          ]
        },
        {
          id: 32,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 321,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 322,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 33,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 331,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 332,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 34,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 341,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 342,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        },
        {
          id: 35,
          type: "container",
          name: "column name",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          cards: [
            {
              type: "draggable",
              id: 351,
              props: {
                className: "card",
                style: { backgroundColor: "#cdefde" }
              },
              data: "card data2",
              timeline: null
            },
            {
              type: "draggable",
              id: 352,
              props: {
                className: "card",
                style: { backgroundColor: "#efcdde" }
              },
              data: "card data1",
              timeline: null
            }
          ]
        }
      ]
    }
  ]
};
