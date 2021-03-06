import componentTemplate from './pull_request_component.html';
import './pull_request_component.less';
import {PullRequestController} from './pull_request_controller';

export class PullRequestComponent implements ng.IComponentOptions {
    public template: string = componentTemplate;
    public bindings: any = {
        pullRequest: '=pr',
        mode: '@'
    };
    public controller = PullRequestController;
}
