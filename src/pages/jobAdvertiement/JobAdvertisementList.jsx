import React, {useEffect, useState} from "react";
import {Button, Grid, Icon, Table} from "semantic-ui-react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import {Link} from "react-router-dom";
import FavoriteService from "../../services/favoriteService";
import swal from "sweetalert";
import Filter from "../../layouts/Filter";

const JobAdvertisementList = () => {

    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    // const [favorites, setFavorites] = useState([]);
    //
    // const handleJobAdvertisement = () => {
    //     let favoriteService = new FavoriteService();
    //     jobAdvertisements.forEach((jobAdvertisement,index) => {
    //         console.log(jobAdvertisement);
    //     })
    //
    //
    // }


    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getByStatusIsTrueAndOrderByApplicationDeadlineAsc().then((result) => setJobAdvertisements(result.data.data));
    }, []);

    const favorite = {
        "favoriteId": 0,
        "jobAdvertisement": {
            "id": 0,
            "jobDescription": "",
            "minSalary": 0,
            "maxSalary": 0,
            "emptyPositionCount": 0,
            "applicationDeadline": "2021-06-30",
            "releaseDate": "2021-06-25",
            "status": true,
            "approvedByAdmin": true,
            "city": {
                "id": 0,
                "name": ""
            },
            "jobPosition": {
                "jobPositionId": 0,
                "name": ""
            },
            "employer": {
                "id": 0,
                "email": "",
                "password": "",
                "companyName": "",
                "webAddress": "",
                "phoneNumber": "",
                "activatedBySystemStaff": false,
                "verifiedByEmail": true
            },
            "workType": {
                "id": 0,
                "name": ""
            },
            "workTime": {
                "id": 0,
                "name": ""
            }
        },
        "staff": {
            "id": 1,
            "email": "",
            "password": "",
            "firstName": "",
            "lastName": "",
            "identificationNumber": "",
            "birthYear": "",
            "verifiedByEmail": true
        }
    }
    const handleOnClick = (jobAdvertisementId) => {
        favorite.jobAdvertisement.id = jobAdvertisementId;
        let favoriteService = new FavoriteService();
        favoriteService.add(favorite).then(result => swal(`${result.data.message}`,"",`${result.data.success ? "success" : "error"}`));
        console.log(favorite); 
    }

    return (
        <div style={{margin: 20}}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Filter style={{marginRight:20}}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Table>
                            <Table.Header style={{textAlign: "center"}}/>
                            <Table.Header>
                                <Table.Row textAlign={"center"}>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                                    <Table.HeaderCell>Şehir</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {jobAdvertisements.map((jobAdvertisement) => (
                                    <Table.Row key={jobAdvertisement.id} textAlign={"center"}>
                                        <Table.Cell>
                                            {jobAdvertisement.employer.companyName}
                                        </Table.Cell>
                                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.city.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workType.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workTime?.name}</Table.Cell>
                                        <Table.Cell>
                                            {jobAdvertisement.applicationDeadline.toString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color={"grey"}
                                                animated={"fade"}
                                                as={Link}
                                                to={`/jobAdvertisementDetails/${jobAdvertisement.id}`}
                                            >
                                                <Button.Content visible>Detaylara Git</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="arrow alternate circle right outline" color={"olive"}
                                                          size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/*{*/}
                                            {/*    favoriteService.getByJobAdvertisementId(jobAdvertisement.id).then(result => (*/}
                                            {/*    <div>*/}
                                            {/*        {result.data.data}*/}
                                            {/*    </div>*/}
                                            {/*))}*/}
                                            <Button
                                                color={"red"}
                                                animated={"fade"}
                                                onClick={() => {
                                                    handleOnClick(jobAdvertisement.id)
                                                }}
                                            >
                                                <Button.Content visible>Favorilere Ekle</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="heart outline" size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>

                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default JobAdvertisementList;
