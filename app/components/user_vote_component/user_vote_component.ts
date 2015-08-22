///<reference path="../../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    export class UserVoteComponent implements ng.IDirective {
        constructor(private config: Config) {}

        restrict: string = 'E';
        scope: any = {
            reviewers: '='
        };
        templateUrl: string = '../components/user_vote_component/user_vote_component.html';

        link: ng.IDirectiveLinkFn = (scope: any) => {
            var classes = ['pr-icon'];
            for (var reviewerIdx = 0, reviewerLength = scope.reviewers.length; reviewerIdx < reviewerLength; reviewerIdx++) {
                var reviewer: Reviewer = scope.reviewers[reviewerIdx];
                if (reviewer.user.username === this.config.getUsername()) {
                    if (reviewer.approved) {
                        classes.push('fa-check-circle', 'icon-approved');
                    } else {
                        classes.push('fa-clock-o', 'icon-waiting');
                    }
                    break;
                }
            }

            scope.icon = classes.join(' ');
        };

        static factory(): ng.IDirectiveFactory {
            var directive = (config) => new UserVoteComponent(config);
            directive.$inject = ['Config'];

            return directive;
        }
    }
}
