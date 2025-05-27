'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">produtores-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CulturasModule.html" data-type="entity-link" >CulturasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' : 'data-bs-target="#xs-controllers-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' :
                                            'id="xs-controllers-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' }>
                                            <li class="link">
                                                <a href="controllers/CulturasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CulturasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' : 'data-bs-target="#xs-injectables-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' :
                                        'id="xs-injectables-links-module-CulturasModule-47e6d713a8f7f7d31a696157967c2110edeb9b6e6f2152fcef66875064454253f604c1353953bcab1a0d88daae672bc029ab42e2e7f836022fdf87370c5a4f67"' }>
                                        <li class="link">
                                            <a href="injectables/CulturasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CulturasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FazendasModule.html" data-type="entity-link" >FazendasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' : 'data-bs-target="#xs-controllers-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' :
                                            'id="xs-controllers-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' }>
                                            <li class="link">
                                                <a href="controllers/FazendasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FazendasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' : 'data-bs-target="#xs-injectables-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' :
                                        'id="xs-injectables-links-module-FazendasModule-9fd1d6f43f2a0e7947a454c2b555a803c602be79374a8423e02f51a96dac5b598bc71bbbdacdac16e6baa1d21b35cd57eace05e05b66c4aa4420305af4b231e5"' }>
                                        <li class="link">
                                            <a href="injectables/FazendasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FazendasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProdutoresModule.html" data-type="entity-link" >ProdutoresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' : 'data-bs-target="#xs-controllers-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' :
                                            'id="xs-controllers-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' }>
                                            <li class="link">
                                                <a href="controllers/ProdutoresController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProdutoresController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' : 'data-bs-target="#xs-injectables-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' :
                                        'id="xs-injectables-links-module-ProdutoresModule-fbd022e4a72dfbc4115998d92f85ed11e20fa7a30d3350a82d88b9af0fb453f674474d73cef6cd7427cbb80cb56f1d2bdfa7023d223a691b23cbda744d03ab6e"' }>
                                        <li class="link">
                                            <a href="injectables/ProdutoresService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProdutoresService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Cultura.html" data-type="entity-link" >Cultura</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Fazenda.html" data-type="entity-link" >Fazenda</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Produtor.html" data-type="entity-link" >Produtor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateCulturaDto.html" data-type="entity-link" >CreateCulturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFazendaDto.html" data-type="entity-link" >CreateFazendaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProdutorDto.html" data-type="entity-link" >CreateProdutorDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});