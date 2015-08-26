///<reference path="../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    var application = angular.module('bitbucketNotifier', ['LocalStorageModule', 'ui.bootstrap']);
    application.directive('pullRequest', PullRequestComponent.factory());
    application.directive('pullRequestsList', PullRequestsListComponent.factory());
    application.directive('pullRequestsHeader', PullRequestsHeaderComponent.factory());
    application.directive('approvalProgress', ApprovalProgressComponent.factory());
    application.directive('userVote', UserVoteComponent.factory());
    application.directive('sectionTitle', SectionTitleComponent.factory());
    application.directive('pullRequestLink', PullRequestLinkComponent.factory());

    application.filter('authored' , AuthoredFilter);
    application.filter('assigned', AssignedFilter);

    application.service('PullRequestRepository', PullRequestRepository);
    application.service('Config', Config);
}
