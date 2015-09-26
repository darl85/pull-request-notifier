///<reference path="../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    export class SoundManager {

        static $inject: string[] = ['Config'];

        constructor(private config: Config) {
            createjs.Sound.registerSound(config.getNewPullRequestSound(), Sound.NEW_PULLREQUEST);
            createjs.Sound.registerSound(config.getApprovedPullRequestSound(), Sound.APPROVED_PULLREQUEST);
            createjs.Sound.registerSound(config.getMergedPullRequestSound(), Sound.MERGED_PULLREQUEST);
            createjs.Sound.registerSound(config.getReminderSound(), Sound.REMINDER);
        }

        play(soundId: string): void {
            createjs.Sound.play(soundId);
        }

        playNewPullRequestSound(): void {
            createjs.Sound.play(Sound.NEW_PULLREQUEST);
        }

        playApprovedPullRequestSound(): void {
            createjs.Sound.play(Sound.APPROVED_PULLREQUEST);
        }

        playMergedPullRequestSound(): void {
            createjs.Sound.play(Sound.MERGED_PULLREQUEST);
        }

        playReminderSound(): void {
            createjs.Sound.play(Sound.REMINDER);
        }

        // @todo Temporarily hardcoded - try to find a better way to store default sounds
        getAvailableSounds(): Sound[] {
            return [
                new Sound('../../assets/sounds/notification.ogg', 'Ring'),
                new Sound('../../assets/sounds/notification2.ogg', 'Bell'),
                new Sound('../../assets/sounds/nuclear_alarm.ogg', 'Nuclear alarm')
            ];
        }
    }
}
