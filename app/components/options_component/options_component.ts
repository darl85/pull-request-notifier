///<reference path="../../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    export class OptionsComponent implements ng.IDirective {
        restrict: string =  'E';
        templateUrl: string = '../components/options_component/options_component.html';

        constructor(
            private config: Config,
            private growl: angular.growl.IGrowlService,
            private $interval: ng.IIntervalService,
            private soundRepository: SoundRepository,
            private notifier: Notifier
        ) {}

        link: ng.IDirectiveLinkFn = (scope: ng.IScope) => {
            scope['examples'] = {
                reviewers: [
                    {
                        approved: true
                    },
                    {
                        approved: false
                    },
                    {
                        approved: false
                    }
                ]
            };

            // @todo Anyone know how to test it? :)
            this.$interval(
                () => {
                    var approvalsCount = scope['examples'].reviewers.reduce(
                        (prev, curr: {approved: boolean}) => {
                            return curr.approved ? prev + 1 : prev;
                        },
                        0
                    );

                    switch (approvalsCount) {
                        case 0:
                            scope['examples'].reviewers[0].approved = true;
                            break;
                        case 1:
                            scope['examples'].reviewers[1].approved = true;
                            break;
                        case 2:
                            scope['examples'].reviewers[2].approved = true;
                            break;
                        case 3:
                            scope['examples'].reviewers[0].approved = false;
                            scope['examples'].reviewers[1].approved = false;
                            scope['examples'].reviewers[2].approved = false;
                            break;
                        default:
                            break;
                    }
                },
                1000
            );

            scope['options'] = {
                appUser: this.config.getUsername(),
                socketServerAddress: this.config.getSocketServerAddress(),
                pullRequestProgress: this.config.getPullRequestProgress(),
                newPullRequestSound: this.config.getNewPullRequestSound(),
                approvedPullRequestSound: this.config.getApprovedPullRequestSound(),
                mergedPullRequestSound: this.config.getApprovedPullRequestSound(),
                reminderSound: this.config.getReminderSound()
            };

            scope['saveOptions'] = () => {
                this.config.setUsername(scope['options'].appUser);
                this.config.setSocketServerAddress(scope['options'].socketServerAddress);
                this.config.setPullRequestProgress(scope['options'].pullRequestProgress);
                this.config.setNewPullRequestSound(scope['options'].newPullRequestSound);
                this.config.setApprovedPullRequestSound(scope['options'].approvedPullRequestSound);
                this.config.setMergedPullRequestSound(scope['options'].mergedPullRequestSound);
                this.config.setReminderSound(scope['options'].reminderSound);

                this.growl.success('Settings applied!');
                this.growl.warning(
                    'Extension will reboot in in 5 seconds',
                    {
                        disableCountDown: false,
                        onclose: () : void => {
                            window['chrome'].runtime.reload();
                        }
                    }
                );
            };

            scope['sounds'] = this.soundRepository.findAll();
            scope['playSound'] = (soundProp: string) => {
                createjs.Sound.addEventListener('fileload', (e) => {
                    createjs.Sound.play('temp_sound');
                });
                createjs.Sound.registerSound(soundProp, 'temp_sound');
                createjs.Sound.play('temp_sound');
            };

            scope['showNotification'] = (type: string) => {
                const pullRequest = new PullRequest();
                pullRequest.title = 'This is some title';
                pullRequest.author.displayName = 'John smith';

                const user = new User();
                user.displayName = 'Anna Kowalsky';

                switch (type) {
                    case 'assigned':
                        this.notifier.notifyNewPullRequestAssigned(pullRequest);
                        break;
                    case 'approved':
                        this.notifier.notifyPullRequestApproved(pullRequest, user);
                        break;
                    case 'merged':
                        this.notifier.notifyPullRequestMerged(pullRequest);
                        break;
                    case 'remind':
                        this.notifier.notifyReminder(pullRequest);
                        break;
                    case 'updated':
                        this.notifier.notifyPullRequestUpdated(pullRequest);
                        break;
                    case 'commented':
                        this.notifier.notifyNewCommentAdded(pullRequest, user);
                        break;
                    case 'replied':
                        this.notifier.notifyNewReplyOnComment(pullRequest, user);
                        break;
                }
            };
        };

        static factory(): ng.IDirectiveFactory {
            const component = (config, growl, $interval, soundRepository, notifier) => new OptionsComponent(config, growl, $interval, soundRepository, notifier);
            component.$inject = ['Config', 'growl', '$interval', 'SoundRepository', 'Notifier'];
            return component;
        }
    }
}
