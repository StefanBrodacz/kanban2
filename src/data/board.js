export default {
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
    }
  ]
};
