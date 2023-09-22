import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";

export const DropUpAnimation = trigger("dropUpBasket", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".basket-item", [
      style({ opacity: 0, transform: "translateY(50px)" })
    ]),
    sequence([
      animate("200ms", style({ height: "*", top: 0 })),
      query(".basket-item", [
        stagger(-50, [
          animate("400ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ])
    ])
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".basket-item", [style({ opacity: 1, transform: "none" })]),
    sequence([
      query(".basket-item", [
        stagger(50, [
          animate(
            "400ms ease",
            style({ opacity: 0, transform: "translateY(50px)" })
          )
        ])
      ]),
      animate("200ms", style({ height: 0 }))
    ])
  ])
]);
