import { Grid } from '@material-ui/core';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { CarModel } from 'api/Car';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image'
import React from 'react';
import MaterialUiLink from 'src/components/MaterialUiLink';
import { getMakes, Make } from 'src/database/getMakes';
import { getModels, Model } from 'src/database/getModels';
import { getPaginatedCars } from 'src/database/getPaginatedCars';
import { getAsString } from 'src/getAsString';
import Search from '.';

export interface CarsListProps {
  makes: Make[];
  models: Model[];
  cars: CarModel[];
  totalPages: number;
}

export default function CarsList({
  makes,
  models,
  cars,
  totalPages,
}: CarsListProps) {
  const { query } = useRouter();
  
  const dgColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'make',
      headerName: 'Make',
      width: 150
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 150
    },
    {
      field: 'year',
      headerName: 'Year',
      type: 'number',
      width: 110
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 110
    },
    {
      field: "photoUrl",
      headerName: 'Photo',
      sortable: false,
      width: 260,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => (
      <><Image src={`${params.getValue(params.id, 'photoUrl') || ''}`} alt="Picture of car" layout="fixed" height="100px" width="100px"/></>
      )
    }
  ];

  const rows = cars;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        <pre style={{ fontSize: '1rem' }}>
          <Pagination
            variant="outlined" shape="rounded"
            page={parseInt(getAsString(query.page) || '1')}
            count={totalPages}
            renderItem={(item) => {
              return (
                <PaginationItem
                  component={MaterialUiLink}
                  query={query}
                  item={item}
                  {...item} />
              );
            }}
          />
          {/* https://material-ui.com/api/data-grid/data-grid/ */}
          <DataGrid
            rows={cars}
            columns={dgColumns}
            autoHeight={true}
          />
          {/* this simply prints the raw car data  */}
          {JSON.stringify({ totalPages, cars }, null, 2)}
        </pre>
      </Grid>
    </Grid>
  );
}





export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);

  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query),
  ]);

  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
};
