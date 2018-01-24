import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { ApolloBase } from "apollo-angular/Apollo";
import gql from "graphql-tag";
import { Observable } from "rxjs/Observable";

import { HeroRoleType, Hero, GraphQLSchema } from "./hero.model";
import { map, tap } from "rxjs/operators";


@Injectable()
export class HeroService {

	private apolloClient: ApolloBase<any>;
	private getAllGqlQuery = gql`
	query GetAllHeroes($role: HeroRoleEnum) {
		heroes (role: $role) {
			key,
			name,
			role,
			health,
		}
	}
	`;

	constructor(
		apollo: Apollo
	) {
		this.apolloClient = apollo.use("shrd");
	}

	getAll(role?: HeroRoleType): Observable<Hero[]> {
		return this.apolloClient.query<GraphQLSchema>({
			query: this.getAllGqlQuery,
			variables: {
				role
			}
		}).pipe(
			map(x => x.data.heroes!),
			tap(x => console.warn(">>> getAll", x))
			);
	}

	getAllViaWatch(role?: HeroRoleType) {
		return this.getAllQuery(role)
			.valueChanges.pipe(
			map(x => x.data.heroes!),
			tap(x => console.warn(">>> getAllViaWatch", x))
			);
	}

	getAllQuery(role?: HeroRoleType): QueryRef<GraphQLSchema> {
		return this.apolloClient.watchQuery({
			query: this.getAllGqlQuery,
			variables: {
				role
			}
		});
	}

	refresh() {
		const ref = this.getAllQuery();
		ref.valueChanges.pipe(
			map(x => x.data.heroes!),
			tap(x => console.warn(">>> refresh", x))
			);
		ref.refetch();
	}

	resetStore() {
		return this.apolloClient.getClient().resetStore();
	}

}