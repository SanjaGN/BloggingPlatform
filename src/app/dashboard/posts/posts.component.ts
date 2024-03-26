import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Post} from "../../models/post.model";
import {Comment} from "../../models/comment.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  posts: Post[] = [];
  comments: Comment[] = [];
  isLoading: boolean = false;
  showComments: boolean = false;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.dashboardService.fetchPosts().subscribe(
      (response: Post[] | Post) => {

        this.isLoading = false;
        if (Array.isArray(response)) {
          this.posts = response.filter(post => post.userId === 1);
        } else if (response instanceof Object) {
          this.posts = response.userId === 1 ? [response] : [];
        }
      }, (error) => {
        console.log('Failed to fetch albums list', error);
      }
    )
  }

  loadComments(post: Post) {
    post.showComments = !post.showComments;
    if(post.showComments) {
      this.dashboardService.fetchComments(post.id).subscribe(
        (response: Comment[]) => {
          post.comments = response;
        }, (error) => {
          console.log('Failed to fetch albums list', error);
        }
      )
    }

  }
}
