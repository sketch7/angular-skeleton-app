import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { ApolloBase } from "apollo-angular/Apollo";
import gql from "graphql-tag";
import { Observable } from "rxjs/Observable";

import { HeroRoleType, GraphQLSchema, Author } from "./hero.model";
import { map, tap } from "rxjs/operators";


@Injectable()
export class HeroService {

	private apolloClient: ApolloBase<any>;
	private getGqlQuery = gql`
	query firstAuthor {
		author(id: 1) {
		  id
		  firstName
		}
	  }
	`;

	constructor(
		apollo: Apollo
	) {
		this.apolloClient = apollo.use("shrd");
	}

	get(role?: HeroRoleType): Observable<Author> {
		return this.apolloClient.query<GraphQLSchema>({
			query: this.getGqlQuery,
			variables: {
				role
			}
		}).pipe(
			map(x => x.data.author!),
			tap(x => console.warn(">>> getAll", x))
			);
	}

	getViaWatch(role?: HeroRoleType) {
		return this.getQuery(role)
			.valueChanges.pipe(
			map(x => x.data.author!),
			tap(x => console.warn(">>> getAllViaWatch", x))
			);
	}

	getQuery(role?: HeroRoleType): QueryRef<GraphQLSchema> {
		return this.apolloClient.watchQuery({
			query: this.getGqlQuery,
			variables: {
				role
			}
		});
	}

	refresh() {
		const ref = this.getQuery();
		ref.valueChanges.pipe(
			map(x => x.data.author!),
			tap(x => console.warn(">>> refresh", x))
			);
		ref.refetch();
	}

	resetStore() {
		return this.apolloClient.getClient().resetStore();
	}

}