///<reference path="../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    var application = angular.module('bitbucketNotifier', ['LocalStorageModule', 'btford.socket-io', 'ui.bootstrap']);
    application.directive('pullRequest', PullRequestComponent.factory());
    application.directive('pullRequestsList', PullRequestsListComponent.factory());
    application.directive('pullRequestsHeader', PullRequestsHeaderComponent.factory());
    application.directive('approvalProgress', ApprovalProgressComponent.factory());
    application.directive('userVote', UserVoteComponent.factory());

    application.filter('authored' , AuthoredFilter);
    application.filter('assigned', AssignedFilter);

    application.factory('PullRequestRepository', () => new PullRequestRepository());
    application.factory('Socket', Socket);
    application.service('SocketHandler', SocketHandler);
    application.service('Notifier', Notifier);
    application.service('Config', Config);
}
