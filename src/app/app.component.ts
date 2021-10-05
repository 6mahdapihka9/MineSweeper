import { Component } from '@angular/core';
import { animations, buildRouteTransition } from 'ngx-animations';
import {trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      // buildRouteTransition({
      //   stateChangeExpr: "records => game",
      //   enter: animations.zoomInLeft(500),
      //   leave: animations.zoomOutRight(200)
      // }),
      // buildRouteTransition({
      //   stateChangeExpr: "statistics => game",
      //   enter: animations.zoomInLeft(500),
      //   leave: animations.zoomOutRight(200)
      // }),
      // buildRouteTransition({
      //   stateChangeExpr: "statistics => records",
      //   enter: animations.zoomInLeft(500),
      //   leave: animations.zoomOutRight(200)
      // }),
      //
      // buildRouteTransition({
      //   stateChangeExpr: "game => records",
      //   enter: animations.zoomOutLeft(500),
      //   leave: animations.zoomInRight(200)
      // }),
      // buildRouteTransition({
      //   stateChangeExpr: "game => statistics",
      //   enter: animations.zoomOutLeft(500),
      //   leave: animations.zoomInRight(200)
      // }),
      // buildRouteTransition({
      //   stateChangeExpr: "records => statistics",
      //   enter: animations.zoomOutLeft(500),
      //   leave: animations.zoomInRight(200)
      // }),

      buildRouteTransition({
        stateChangeExpr: '* => *',
        enter: animations.fadeIn(125),
        leave: animations.fadeOut(125),
      })
    ])
  ]
})

export class AppComponent {

}
