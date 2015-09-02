///<reference path="../_typings.ts"/>

module BitbucketNotifier {
    'use strict';
    
    // @todo Move event handling to some "Chrome events handler/emitter"
    export class PullRequestRepository {
        static $inject: Array<string> = ['$rootScope'];

        pullRequests: Array<PullRequest> = [];

        constructor(private $rootScope: ng.IRootScopeService) {
            window['chrome'].extension.onConnect.addListener((port) => {
                port.postMessage(new ChromeExtensionEvent(ChromeExtensionEvent.UPDATE_PULLREQUESTS, this.pullRequests));
            });

            var port = window['chrome'].extension.connect({name: "Bitbucket Notifier"});
            port.onMessage.addListener((message: ChromeExtensionEvent) => {
                this.$rootScope.$apply(() => {
                    this.pullRequests = message.content;
                });
            });

            window['chrome'].extension.onMessage.addListener((message: ChromeExtensionEvent) => {
                if (message.type === ChromeExtensionEvent.UPDATE_PULLREQUESTS) {
                    $rootScope.$apply(() => {
                        this.pullRequests = message.content;
                    });
                }
            });
        }

        setPullRequests(pullRequests: Array<PullRequest>): void {
            this.pullRequests = pullRequests;
            window['chrome'].extension.sendMessage(
                new ChromeExtensionEvent(
                    ChromeExtensionEvent.UPDATE_PULLREQUESTS,
                    this.pullRequests
                )
            );
        }

        hasAssignmentChanged(newPullRequest: PullRequest): boolean {
            for (var prIdx = 0, prLen = this.pullRequests.length; prIdx < prLen; prIdx++) {
                var pullRequest = this.pullRequests[prIdx];
                if (pullRequest.equals(newPullRequest)) {
                    if (newPullRequest.reviewers.length !== pullRequest.reviewers.length) {
                        return true;
                    } else {
                        var usersDiff = _.difference(
                            newPullRequest.getReviewersList(),
                            pullRequest.getReviewersList()
                        );

                        if (usersDiff.length > 0) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
    }

    export class NotificationRepository {
        private notifications: Array<Notification> = [];

        add(notificationId: string, pullRequestLink: string): void {
            var prNotification = new PullRequestNotification();
            prNotification.notificationId = notificationId;
            prNotification.pullRequestHtmlLink = pullRequestLink;

            this.notifications.push(prNotification);
        }

        getAll(): Array<Notification> {
            return this.notifications;
        }

        find(notificationId: string): Notification {
            for (var notifIdx = 0, notifLen = this.notifications.length; notifIdx < notifLen; notifIdx++) {
                var notification = this.notifications[notifIdx];
                if (notification.notificationId === notificationId) {
                    return notification;
                }
            }

            return new PullRequestNotification();
        }
    }
}
