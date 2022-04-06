import {PositionController} from "./position.controller";
import {PositionService} from "./position.service";
import {PositionResolver} from "./position.resolver";
import {Position} from "./position.model";
import {Test} from "@nestjs/testing";

describe('PositionController', () => {let positionController: PositionController;
    let positionService: PositionService;
    let positionResolver: PositionResolver;
    let positionRepository: any;
    const mockPosition = {
        "id": 1,
        "title": "Associate Director, Advertising Interfaces & Market Intelligence",
        "description": "Spotify Advertising is building the world’s leading audio-first advertising platform and we are seeking a leader with a passion for building to help us realize this vision. In this role, you will lead two Product Marketing teams in our Advertising business unit- the Self-Serve team and the Market Intelligence team. The Self-Serve team is a team of PMMs who collaborate with our R&D teams to build and grow our ad interfaces such as Ad Studio and developer-facing APIs. The Market Intelligence team is a group of senior PMMs and analysts who define platform-level and local market product strategies. Together, these teams are at the heart of defining the future direction for our Spotify Advertising business. \nYou will report to our Global Director of Monetization Product Marketing that sits within Spotify’s Advertising Business Unit.\n\nIn this role, you will shape the future of digital audio monetization, across music, podcasts, and new formats working alongside a diverse set of teams in the Advertising Business Unit – including product, engineering, design, research, ops, and sales teams. \n\nThis is a high-impact role on a forward-thinking team and offers the opportunity to make a significant impact on our rapidly growing ads business. And because ads are an important part of Spotify, your work will impact the way the world experiences music and podcasts too.\nEND_OF_PARAGRAPH\nWhat You'll Do\nEND_OF_SUBTITLE\nLead, run, and grow a strong forward-thinking team of product marketers that performs market analysis to help inform our product team's strategy and roadmap, delivers best in class go-to-market product launches, and develops detailed growth strategies to drive product adoption that leads to revenue.\nEND_OF_LIST_ITEM\nPartner with a broad and global cross-functional team including senior leads in Sales, Marketing, Product, and Engineering to drive multi-year product strategies that span product ideation, product market fit, launch, and product growth.\nEND_OF_LIST_ITEM\nActing within our player-coach model, lead your team by example and take responsibility for high impact projects that drive impact within our global ads business.\nEND_OF_LIST_ITEM\nWith your team, define global and local strategies that drive revenue growth based on product adoption.\nEND_OF_LIST_ITEM\nManage your teams using the right balance of operational rigor and creative freedom to enable each individual to thrive.\nEND_OF_LIST_ITEM\nInfluence at the most senior levels of our Ads Business Unit and beyond.\nEND_OF_LIST_ITEM\nEND_OF_PARAGRAPH\nWho You Are\nEND_OF_SUBTITLE\nA sciences-based degree or masters; MBA preferred\nEND_OF_LIST_ITEM\nA min of 7+ years of relevant experience, including experience directly managing strong teams of product marketers and analysts\nEND_OF_LIST_ITEM\nA natural leader who can take ambiguous problems, define a path using data and inputs from a diverse set of partners, and then inspire others to take action. Your track record shows numerous occasions of bringing people together to accomplish something you’re passionate about.\nEND_OF_LIST_ITEM\nYou are an accomplished people manager who has shown you can influence your team to grow and deliver at a high quality and with efficiency. \nEND_OF_LIST_ITEM\nYou’re a strategic problem solver, comfortable operating within a fast-paced environment and using data to calibrate your decisions. You enjoy taking initiative to turn a business challenge into a plan to drive growth.\nEND_OF_LIST_ITEM\nYou know what it takes to drive revenue impact through product growth and can coach your team to define and consistently hit adoption targets.\nEND_OF_LIST_ITEM\nHighly collaborative and cross-functional, and know-how to build and wield informal influence to drive others to take an action. You have a clear point of view, strong communication skills, and proactively and confidently influence senior management and product leaders.\nEND_OF_LIST_ITEM\nEND_OF_PARAGRAPH\nWhere You'll Be\nEND_OF_SUBTITLE\nWe are a distributed workforce enabling our band members to find a work mode that is best for them!\nEND_OF_LIST_ITEM\nWhere in the world? For this role, it can be within the Americas region in which we have a work location. This team will operate on an Eastern time zone. \nEND_OF_LIST_ITEM\nPrefer an office to work from home instead? Not a problem! We have plenty of options for your working preferences. \nEND_OF_LIST_ITEM\nFind more information about our Work From Anywhere options here.\nEND_OF_LIST_ITEM\nEND_OF_PARAGRAPH\nSpotify is an equal opportunity employer. You are welcome at Spotify for who you are, no matter where you come from, what you look like, or what’s playing in your headphones. Our platform is for everyone, and so is our workplace. The more voices we have represented and amplified in our business, the more we will all thrive, contribute, and be forward-thinking! So bring us your personal experience, your perspectives, and your background. It’s in our differences that we will find the power to keep revolutionizing the way the world listens.\n\nSpotify transformed music listening forever when we launched in 2008. Our mission is to unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art and billions of fans the chance to enjoy and be passionate about these creators. Everything we do is driven by our love for music and podcasting. Today, we are the world’s most popular audio streaming subscription service with a community of more than 381 million users.\n\nGlobal COVID and Vaccination Disclosure\nSpotify is committed to safety and well-being of our employees, vendors and clients. We are following regional guidelines mandating vaccination and testing requirements, including those requiring vaccinations and testing for in-person roles and event attendance. For the US, we have mandated that all employees and contractors be fully vaccinated in order to work in our offices and externally with any third-parties. For all other locations, we strongly encourage our employees to get vaccinated and also follow local COVID and safety protocols.\n\nThis role is not eligible for hire in Colorado, USA.\nEND_OF_PARAGRAPH",
        "location": "New York, NY",
        "applyButtonURL": "https://jobs.lever.co/spotify/ddd4048a-92b4-4d89-af1d-ec1776573f4f"
    } as Position;

    const getMockPosition = async () => {
        return mockPosition;
    }

    const getMockPositions = async () => {
        return [mockPosition];
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PositionController],
            providers: [
                {
                    provide: PositionService,
                    useValue: {
                        scrapeSpotifyData: jest.fn(() => getMockPositions()),
                        addPosition: jest.fn(() => getMockPosition()),
                        addPositions: jest.fn(() => getMockPositions()),
                        getById: jest.fn(() => getMockPosition()),
                        getAllPositions: jest.fn(() => getMockPositions())
                    }
                },
                {
                    provide: PositionResolver,
                    useValue: {
                        getPositionById: jest.fn((id) => getMockPosition()),
                        getAllPositions: jest.fn(() => getMockPositions())
                    }
                }
            ]
        }).compile();
        positionService = moduleRef.get(PositionService);
        positionResolver = moduleRef.get(PositionResolver);
        positionController = moduleRef.get(PositionController);
    });

    describe('getAllPositions', () => {
        it('should return an array of positions', async () => {
            const result = getMockPositions();
            jest.spyOn(positionService, 'getAllPositions').mockImplementation(() => result);
            const tmp = await positionController.getAllPositions();
            expect(await positionController.getAllPositions()).toStrictEqual(await result);
        });

        it('should return a position by id', async () => {
            const result = getMockPosition();
            jest.spyOn(positionService, 'getById').mockImplementation(() => result);

            expect(await positionController.getById(1)).toBe(await result);
        });

        it('should return an scraped positions array', async () => {
            const result = getMockPositions();
            jest.spyOn(positionService, 'scrapeSpotifyData').mockImplementation(() => result);
            expect(await positionController.scrapeData()).toStrictEqual(await result);
        });
    });
});