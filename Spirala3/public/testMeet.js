let assert = chai.assert;
describe('GoogleMeet', function () {
    it('Prazan string', function () {
        const k1 = "";
        let status = GoogleMeet.dajZadnjuVježbu(k1);
        assert.equal(status, null);
        status = GoogleMeet.dajZadnjePredavanje(k1);
        assert.equal(status, null);
    });
    it('Pogrešni nazivi linkova', function () {
        const k1 = `<div class=\"course-content\">
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-ufrm-nnn\">Link za pristup pred
                                                            </a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
            data-sectionid=\"1\" data-sectionreturnid=\"0\">
            <div class=\"left side\"></div>
            <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                    src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                    height=\"1\"></div>
            <div class=\"content\">
                <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                            href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                            </a></span></h3>
                <div class=\"section_availability\"></div>
                <div class=\"summary\"></div>
                <ul class=\"section img-text\">
                    <li class=\"activity label modtype_label \" id=\"module-71968\">
                        <div>
                            <div class=\"mod-indent-outer w-100\">
                                <div class=\"mod-indent\"></div>
                                <div>
                                    <div class=\"contentwithoutlink \">
                                        <div class=\"no-overflow\">
                                            <div class=\"no-overflow\">
                                                <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                        href=\"http://meet.google.com/fee-uucm-nnn\">Link za pristup
                                                        vj</a></p>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
        </li>
        <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Decembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uucm-nge\">Link za pristup
                                                            </a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Januar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uucm-frnn\">Link za pristup
                                                            vjei</a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
        </ul>
    </div>`
        let status = GoogleMeet.dajZadnjuVježbu(k1);
        assert.equal(status, null);
        status = GoogleMeet.dajZadnjePredavanje(k1);
        assert.equal(status, null);
    });
    it('link van liste', function () {
        const k1 = `<div class=\"course-content\">
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Septembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/gre-prem-nnn\">Link za pristup
                                                            vjezbi</a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
            data-sectionid=\"1\" data-sectionreturnid=\"0\">
            <div class=\"left side\"></div>
            <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                    src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                    height=\"1\"></div>
            <div class=\"content\">
                <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                            href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobr
                            </a></span></h3>
                <div class=\"section_availability\"></div>
                <div class=\"summary\"></div>
                <ul class=\"section img-text\">
                    <li class=\"activity label modtype_label \" id=\"module-71968\">
                        <div>
                            <div class=\"mod-indent-outer w-100\">
                                <div class=\"mod-indent\"></div>
                                <div>
                                    <div class=\"contentwithoutlink \">
                                        <div class=\"no-overflow\">
                                            <div class=\"no-overflow\">
                                                <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                        href=\"http://meet.google.com/uxe-uucm-nnn\">Link za pristup
                                                        predavanju</a></p>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
        </li>
        <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uucm-nnn\">Link za pristup
                                                            predavanju </a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">sedmica 4
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uzrm-vre\">Link za pristup
                                                            predavanju </a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
        </ul>
        <p dir=\"ltr\" style=\"text-align: left;\"><a
            href=\"http://meet.google.com/uu-bbbb-frt\">Link za pristup vjezbi
            </a></p>
            <p dir=\"ltr\" style=\"text-align: left;\"><a
                href=\"http://meet.google.com/uu-bbbb-frt\">Link za pristup predavanju
                </a></p>
    </div>`
        status = GoogleMeet.dajZadnjuVježbu(k1);
        assert.equal(status, "http://meet.google.com/gre-prem-nnn");
        status = GoogleMeet.dajZadnjePredavanje(k1);
        assert.equal(status, "http://meet.google.com/uxe-uzrm-vre");
    });
    it('Predavanja i vježbe u prvoj sedmici', function () {
        const k1 = `<div class=\"course-content\">
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uotre-nnn\">Link za pristup
                                                            vjezbi</a></p>
                                                            <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google.com/qqerce-uucm-nnn\">Link za pristup
                                                                predavanj</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
            data-sectionid=\"1\" data-sectionreturnid=\"0\">
            <div class=\"left side\"></div>
            <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                    src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                    height=\"1\"></div>
            <div class=\"content\">
                <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                            href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                            </a></span></h3>
                <div class=\"section_availability\"></div>
                <div class=\"summary\"></div>
                <ul class=\"section img-text\">
                    <li class=\"activity label modtype_label \" id=\"module-71968\">
                        <div>
                            <div class=\"mod-indent-outer w-100\">
                                <div class=\"mod-indent\"></div>
                                <div>
                                    <div class=\"contentwithoutlink \">
                                        <div class=\"no-overflow\">
                                            <div class=\"no-overflow\">
    
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
        </li>
        <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Decembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
    
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Januar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
    
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
        </ul>
    
    </div>`
        status = GoogleMeet.dajZadnjuVježbu(k1);
        assert.equal(status, "http://meet.google.com/uxe-uotre-nnn");
        status = GoogleMeet.dajZadnjePredavanje(k1);
        assert.equal(status, "http://meet.google.com/qqerce-uucm-nnn");
    });
    it('Nije validan HTML kod', function () {
        const k1 = `<div>
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uotre-nnn\">Link za pristup
                                                            vjezbi</a></p>
                                                            <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google.com/qqerce-uucm-nnn\">Link za pristup
                                                                predavanj</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
            data-sectionid=\"1\" data-sectionreturnid=\"0\">
            <div class=\"left side\"></div>
            <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                    src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                    height=\"1\"></div>
            <div class=\"content\">
                <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                            href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                            </a></span></h3>
                <div class=\"section_availability\"></div>
                <div class=\"summary\"></div>
                <ul class=\"section img-text\">
                    <li class=\"activity label modtype_label \" id=\"module-71968\">
                        <div>
                            <div class=\"mod-indent-outer w-100\">
                                <div class=\"mod-indent\"></div>
                                <div>
                                    <div class=\"contentwithoutlink \">
                                        <div class=\"no-overflow\">
                                            <div class=\"no-overflow\">
    
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
        </li>
        <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Decembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
    
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Januar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
    
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
        </ul>
    
    </div>`
        status = GoogleMeet.dajZadnjuVježbu(k1);
        assert.equal(status, "null");
        status = GoogleMeet.dajZadnjePredavanje(k1);
        assert.equal(status, "null");
    });
    describe('#dajZadnjePredavanje', function () {
        it('Nema predavanja', function () {
            const k1 = `<div class=\"course-content\">
       <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
       <ul class=\"weeks\">
           <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
               data-sectionid=\"1\" data-sectionreturnid=\"0\">
               <div class=\"left side\"></div>
               <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                       src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                       height=\"1\"></div>
               <div class=\"content\">
                   <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                               href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                               </a></span></h3>
                   <div class=\"section_availability\"></div>
                   <div class=\"summary\"></div>
                   <ul class=\"section img-text\">
                       <li class=\"activity label modtype_label \" id=\"module-71968\">
                           <div>
                               <div class=\"mod-indent-outer w-100\">
                                   <div class=\"mod-indent\"></div>
                                   <div>
                                       <div class=\"contentwithoutlink \">
                                           <div class=\"no-overflow\">
                                               <div class=\"no-overflow\">
                                                   <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                           href=\"http://meet.google.com/tre-uucm-nnn\">Link za pristup
                                                           vjezbi</a></p>
   
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </li>
   
                   </ul>
               </div>
           </li>
   
       </ul>
   </div>`
            let status = GoogleMeet.dajZadnjePredavanje(k1);
            assert.equal(status, null);
        });
        it('Ne sadrži meet.google.com (predavanje)', function () {
            const k1 = `<div class=\"course-content\">
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://google.com/uxe-uufces-nnn\">Link za pristup predavanju</a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>`
            let status = GoogleMeet.dajZadnjuVježbu(k1);
            assert.equal(status, null);
        });
    });
    describe('#dajZadnjuVjezbu', function () {
        it('Nema vježbi', function () {
            const k1 = `<div class=\"course-content\">
        <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
        <ul class=\"weeks\">
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-uucm-nnn\">Link za pristup predavanju</a></p>
    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>`
            let status = GoogleMeet.dajZadnjuVježbu(k1);
            assert.equal(status, null);
        });
        it('Vježbe svake druge sedmice', function () {
            const k1 = `<div class=\"course-content\">
            <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
            <ul class=\"weeks\">
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google.com/tzm-uucm-nnn\">Link za pristup
                                                                </a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://meet.google.com/uxe-hgew-nnn\">Link za pristup
                                                            vjezbi</a></p>
        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
        
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Decembar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google.com/uxe-uucm-nkvy\">Link za pristup
                                                                </a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Januar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google.com/uxe-uucm-nnn\">Link za pristup
                                                                vjezbi</a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
            </ul>
        </div>`
            let status = GoogleMeet.dajZadnjuVježbu(k1);
            assert.equal(status, "http://meet.google.com/uxe-uucm-nnn");
        });
        it('URL ne sadži meet.google.com (vježbe)', function () {
            const k1 = `<div class=\"course-content\">
            <h2 class=\"accesshide\">Uvodna sekcija (sedmični format)</h2>
            <ul class=\"weeks\">
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Oktobar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.com/uxe-uucm-nnn\">Link za pristup vjezbama
                                                                </a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                data-sectionid=\"1\" data-sectionreturnid=\"0\">
                <div class=\"left side\"></div>
                <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                        src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                        height=\"1\"></div>
                <div class=\"content\">
                    <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Novembar
                                </a></span></h3>
                    <div class=\"section_availability\"></div>
                    <div class=\"summary\"></div>
                    <ul class=\"section img-text\">
                        <li class=\"activity label modtype_label \" id=\"module-71968\">
                            <div>
                                <div class=\"mod-indent-outer w-100\">
                                    <div class=\"mod-indent\"></div>
                                    <div>
                                        <div class=\"contentwithoutlink \">
                                            <div class=\"no-overflow\">
                                                <div class=\"no-overflow\">
                                                    <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                            href=\"http://vjezbe/uxe-uucm-nnn\">Link za pristup
                                                            vjezbi</a></p>
        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
        
                    </ul>
                </div>
            </li>
            <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Decembar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.google/uxe-uucm-nnn\">Link za pristup vježbama
                                                                </a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
                <li id=\"section-1\" class=\"section main clearfix\" role=\"region\" aria-labelledby=\"sectionid-1793-title\"
                    data-sectionid=\"1\" data-sectionreturnid=\"0\">
                    <div class=\"left side\"></div>
                    <div class=\"right side\"><img class=\"icon spacer\" alt=\"\" aria-hidden=\"true\"
                            src=\"https://c2.etf.unsa.ba/theme/image.php/boost/core/1602492614/spacer\" width=\"1\"
                            height=\"1\"></div>
                    <div class=\"content\">
                        <h3 id=\"sectionid-1793-title\" class=\"sectionname\"><span><a
                                    href=\"https://c2.etf.unsa.ba/course/view.php?id=119#section-1\">Januar
                                    </a></span></h3>
                        <div class=\"section_availability\"></div>
                        <div class=\"summary\"></div>
                        <ul class=\"section img-text\">
                            <li class=\"activity label modtype_label \" id=\"module-71968\">
                                <div>
                                    <div class=\"mod-indent-outer w-100\">
                                        <div class=\"mod-indent\"></div>
                                        <div>
                                            <div class=\"contentwithoutlink \">
                                                <div class=\"no-overflow\">
                                                    <div class=\"no-overflow\">
                                                        <p dir=\"ltr\" style=\"text-align: left;\"><a
                                                                href=\"http://meet.googlecom/uxe-uucm-nnn\">Link za pristup
                                                                vjezbi</a></p>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
        
                        </ul>
                    </div>
                </li>
            </ul>
        </div>`
            let status = GoogleMeet.dajZadnjuVježbu(k1);
            assert.equal(status, null);
        });
    });
});
