import {PullRequestRepository} from '../services/pull_request_repository';
import {Project} from '../models/project';

export function RoutingConfiguration(
    stateProvider: angular.ui.IStateProvider,
    urlProvider: angular.ui.IUrlRouterProvider
): void {
    urlProvider.otherwise('/');
    stateProvider
        .state('home', {
            url: '/',
            template: '<pull-requests-list></pull-requests-list>'
        })
        .state('pull_request', {
            url: '/pull_request/{repositoryName}/{pullRequestId:int}',

            views: {
                '': {
                    template: '<pull-request-preview pr="pullRequest"></pull-request-preview>',
                    controller: [
                        '$scope',
                        '$stateParams',
                        'PullRequestRepository',
                        ($scope: ng.IScope, params: angular.ui.IStateParamsService, prRepo: PullRequestRepository) => {
                            const repositoryName = Project.deslugify(params['repositoryName']);
                            $scope['pullRequest'] = prRepo.find(repositoryName, params['pullRequestId']);
                        }
                    ]
                },
                'navbar': {
                    template: '<navigation-brand icon="chevron-left" content="Pull Request">'
                }
            }
        });
}

RoutingConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
